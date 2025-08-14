#!/bin/bash

# 🗄️ cPanel Production Setup Script for Forosta Licence
# This script sets up your AdonisJS application for cPanel hosting

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Database configuration
DB_HOST="localhost"
DB_USER="forostaj_ario"
DB_PASSWORD="Uzw~oqv-sQ3F"
DB_NAME="forostaj_licence_db"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites for cPanel hosting..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed or not in PATH"
        print_warning "Please ensure Node.js is available in your cPanel environment"
        exit 1
    fi
    
    # Check Node.js version
    NODE_VERSION=$(node --version | cut -d'v' -f2)
    REQUIRED_VERSION="18.16.0"
    
    if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
        print_warning "Node.js version $NODE_VERSION is below recommended version $REQUIRED_VERSION"
        print_warning "This might cause compatibility issues"
    else
        print_success "Node.js version $NODE_VERSION ✓"
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed or not in PATH"
        exit 1
    fi
    
    print_success "npm ✓"
    
    # Check if we're in the right directory
    if [ ! -f "package.json" ]; then
        print_error "package.json not found. Please run this script from your AdonisJS project root."
        exit 1
    fi
    
    print_success "Project directory ✓"
}

# Function to setup production environment
setup_production_env() {
    print_status "Setting up production environment for cPanel..."
    
    if [ -f "env.production" ]; then
        if [ -f ".env" ]; then
            print_warning ".env file already exists. Backing up..."
            cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
        fi
        
        cp env.production .env
        print_success "Production environment file copied to .env"
        
        # Generate new app key
        print_status "Generating production app key..."
        if command -v node &> /dev/null; then
            APP_KEY=$(node ace generate:key 2>/dev/null | grep -o 'APP_KEY=.*' | cut -d'=' -f2)
            if [ ! -z "$APP_KEY" ]; then
                # Update .env file with the new key
                if [[ "$OSTYPE" == "darwin"* ]]; then
                    # macOS
                    sed -i '' "s/APP_KEY=.*/APP_KEY=$APP_KEY/" .env
                else
                    # Linux
                    sed -i "s/APP_KEY=.*/APP_KEY=$APP_KEY/" .env
                fi
                print_success "App key generated and updated in .env"
            else
                print_warning "Could not generate app key automatically. Please run 'node ace generate:key' manually."
            fi
        fi
    else
        print_error "env.production file not found!"
        return 1
    fi
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing production dependencies..."
    
    if [ -f "package-lock.json" ]; then
        npm ci --only=production
    else
        npm install --only=production
    fi
    
    print_success "Dependencies installed"
}

# Function to build application
build_application() {
    print_status "Building application for production..."
    
    if npm run build; then
        print_success "Application built successfully! ✓"
        
        # Check if server.js was created
        if [ -f "server.js" ]; then
            print_success "server.js created successfully"
        else
            print_error "Build failed. server.js not found."
            return 1
        fi
    else
        print_error "Build failed! ✗"
        return 1
    fi
}

# Function to create cPanel startup script
create_cpanel_startup() {
    print_status "Creating cPanel startup script..."
    
    cat > start-cpanel.sh << 'EOF'
#!/bin/bash

# 🚀 cPanel Startup Script for Forosta Licence
# This script starts your AdonisJS application in cPanel

# Navigate to project directory
cd "$(dirname "$0")"

# Load environment variables
export $(cat .env | xargs)

# Start the application
echo "Starting Forosta Licence application..."
echo "Environment: $NODE_ENV"
echo "Port: $PORT"
echo "Database: $DB_NAME"

# Start the application
node server.js
EOF

    chmod +x start-cpanel.sh
    print_success "cPanel startup script created (start-cpanel.sh)"
}

# Function to create .htaccess for cPanel
create_htaccess() {
    print_status "Creating .htaccess file for cPanel..."
    
    cat > public/.htaccess << 'EOF'
# .htaccess for AdonisJS in cPanel
# This file handles routing for your SPA

RewriteEngine On

# Handle Angular/React routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.html [L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Cache static assets
<FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
    Header set Cache-Control "public, immutable"
</FilesMatch>

# Compress text files
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
EOF

    print_success ".htaccess file created in public directory"
}

# Function to create cPanel cron job script
create_cron_script() {
    print_status "Creating cPanel cron job script..."
    
    cat > cron-start.sh << 'EOF'
#!/bin/bash

# 🕐 cPanel Cron Job Script for Forosta Licence
# This script can be used with cPanel cron jobs to keep your app running

# Navigate to project directory
cd "$(dirname "$0")"

# Check if application is running
if ! pgrep -f "node server.js" > /dev/null; then
    echo "$(date): Application not running, starting..."
    nohup node server.js > app.log 2>&1 &
    echo "$(date): Application started with PID $!"
else
    echo "$(date): Application is already running"
fi
EOF

    chmod +x cron-start.sh
    print_success "Cron job script created (cron-start.sh)"
}

# Function to create cPanel-specific README
create_cpanel_readme() {
    print_status "Creating cPanel deployment guide..."
    
    cat > CPANEL_DEPLOYMENT.md << 'EOF'
# 🚀 cPanel Deployment Guide for Forosta Licence

## 📋 cPanel Requirements

- **Node.js**: Version 18.16.0 or higher (available in cPanel)
- **MySQL**: Your cPanel MySQL database
- **SSH Access**: For running Node.js applications (if available)

## 🗄️ Database Setup in cPanel

### 1. Create Database
1. Go to cPanel → MySQL Databases
2. Create a new database: `forostaj_licence_db`
3. Create a new user: `forostaj_ario`
4. Set password: `Uzw~oqv-sQ3F`
5. Add user to database with ALL PRIVILEGES

### 2. Database Credentials
- **Host**: `localhost`
- **Database**: `forostaj_licence_db`
- **Username**: `forostaj_ario`
- **Password**: `Uzw~oqv-sQ3F`

## 🚀 Deployment Steps

### Step 1: Upload Your Project
1. Upload your project files to your cPanel home directory
2. Extract the files if uploaded as ZIP
3. Navigate to your project directory via SSH or File Manager

### Step 2: Run Setup Script
```bash
chmod +x setup-cpanel.sh
./setup-cpanel.sh
```

### Step 3: Start Application
```bash
# Option 1: Direct start
./start-cpanel.sh

# Option 2: Background start
nohup ./start-cpanel.sh > app.log 2>&1 &

# Option 3: Using cPanel cron (recommended)
# Add this to cPanel cron jobs:
# */5 * * * * /home/username/path/to/your/project/cron-start.sh
```

## 🔧 cPanel-Specific Commands

### Check Application Status
```bash
# Check if app is running
ps aux | grep "node server.js"

# Check logs
tail -f app.log

# Check port usage
netstat -tlnp | grep :3333
```

### Restart Application
```bash
# Kill existing process
pkill -f "node server.js"

# Start again
nohup ./start-cpanel.sh > app.log 2>&1 &
```

## 📱 Access Your Application

- **Local Access**: `http://localhost:3333`
- **Public Access**: Configure domain/subdomain in cPanel
- **API Endpoints**: `http://localhost:3333/api/*`

## 🌐 Domain Configuration

### Option 1: Subdomain
1. Go to cPanel → Subdomains
2. Create subdomain (e.g., `app.yourdomain.com`)
3. Point to your project directory

### Option 2: Addon Domain
1. Go to cPanel → Addon Domains
2. Add your domain
3. Point to your project directory

## 🔒 Security Considerations

1. **Port Access**: Port 3333 should only be accessible locally
2. **Environment Variables**: Keep .env file secure
3. **Database Access**: Restrict database user privileges
4. **File Permissions**: Set appropriate file permissions

## 🚨 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   lsof -i :3333
   kill -9 <PID>
   ```

2. **Permission Denied**
   ```bash
   chmod +x *.sh
   chmod 644 .env
   ```

3. **Database Connection Failed**
   - Verify database credentials in cPanel
   - Check if MySQL service is running
   - Ensure user has proper privileges

4. **Application Not Starting**
   ```bash
   # Check logs
   tail -f app.log
   
   # Check Node.js version
   node --version
   
   # Check if dependencies are installed
   ls -la node_modules
   ```

## 📊 Monitoring

### Log Files
- **Application logs**: `app.log`
- **Error logs**: Check cPanel error logs
- **Access logs**: Check cPanel access logs

### Health Check
```bash
# Test if application is responding
curl -f http://localhost:3333/api/users || echo "App not responding"
```

## 🎯 Next Steps

1. **Set up domain/subdomain** in cPanel
2. **Configure SSL certificate** (Let's Encrypt available in cPanel)
3. **Set up automated restarts** using cron jobs
4. **Monitor application** performance and logs
5. **Set up backups** for your database and files

---

**🎉 Your Forosta Licence application is ready for cPanel!**
EOF

    print_success "cPanel deployment guide created (CPANEL_DEPLOYMENT.md)"
}

# Function to show database setup instructions
show_database_instructions() {
    echo ""
    print_success "🗄️ cPanel Database Setup Instructions"
    echo "============================================="
    echo ""
    echo "📋 Follow these steps in your cPanel:"
    echo ""
    echo "1. Go to cPanel → MySQL Databases"
    echo "2. Create a new database: $DB_NAME"
    echo "3. Create a new user: $DB_USER"
    echo "4. Set password: $DB_PASSWORD"
    echo "5. Add user to database with ALL PRIVILEGES"
    echo ""
    echo "🔗 Database Connection Details:"
    echo "   Host: $DB_HOST"
    echo "   Database: $DB_NAME"
    echo "   Username: $DB_USER"
    echo "   Password: $DB_PASSWORD"
    echo ""
}

# Function to show final instructions
show_final_instructions() {
    echo ""
    print_success "🎉 cPanel production setup completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "  1. Set up your database in cPanel MySQL Databases"
    echo "  2. Run migrations: NODE_ENV=production node ace migration:run"
    echo "  3. Start your application: ./start-cpanel.sh"
    echo "  4. Configure domain/subdomain in cPanel"
    echo ""
    echo "🚀 To start your application:"
    echo "  ./start-cpanel.sh                    # Direct start"
    echo "  nohup ./start-cpanel.sh > app.log 2>&1 &  # Background start"
    echo ""
    echo "🔧 Useful commands:"
    echo "  ps aux | grep 'node server.js'      # Check if running"
    echo "  tail -f app.log                      # View logs"
    echo "  pkill -f 'node server.js'           # Stop app"
    echo ""
    echo "📚 For detailed instructions, see: CPANEL_DEPLOYMENT.md"
    echo ""
    echo "🌐 Your application will run on port 3333"
    echo "   Access via: http://localhost:3333"
}

# Main execution
main() {
    echo "🗄️ Forosta Licence cPanel Production Setup"
    echo "=========================================="
    echo ""
    
    # Check prerequisites
    check_prerequisites
    
    # Setup production environment
    setup_production_env
    
    # Install dependencies
    install_dependencies
    
    # Build application
    build_application
    
    # Create cPanel-specific files
    create_cpanel_startup
    create_htaccess
    create_cron_script
    create_cpanel_readme
    
    # Show database instructions
    show_database_instructions
    
    # Show final instructions
    show_final_instructions
}

# Run main function
main "$@"
