# 🚀 **Complete Local Setup Guide for Forosta Licence**

This guide will walk you through setting up the Forosta Licence project on a completely new local environment, step by step.

## 📋 **Prerequisites (External Setup)**

### **1. Install Node.js**
```bash
# Check if Node.js is installed
node --version

# If not installed, download from: https://nodejs.org/
# Or use Homebrew (macOS):
brew install node

# Verify installation
node --version  # Should be 18.16.0 or higher
npm --version   # Should be 9.0.0 or higher
```

### **2. Install MySQL**
```bash
# Check if MySQL is installed
mysql --version

# If not installed, use Homebrew (macOS):
brew install mysql

# Start MySQL service
brew services start mysql

# Set root password (first time only)
mysql_secure_installation
# Follow prompts and set password to: root1234
```

## 🛠️ **Project Setup (Step by Step)**

### **Step 1: Navigate to Project Directory**
```bash
# Navigate to your project folder
cd /Users/ariobaskoro/quantum/forosta/licence

# Verify you're in the right place
pwd
ls -la
```

### **Step 2: Install Dependencies**
```bash
# Install all required packages
npm install

# Verify installation
ls -la node_modules
```

### **Step 3: Set Up Environment**
```bash
# Copy development environment template
cp env.development .env

# Verify .env file was created
cat .env
```

### **Step 4: Set Up Database**
```bash
# Connect to MySQL and create database
mysql -u root -p
# Enter password: root1234

# In MySQL, run:
CREATE DATABASE IF NOT EXISTS licence_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES;
EXIT;

# Verify database creation
mysql -u root -p -e "SHOW DATABASES;" | grep licence_db
```

### **Step 5: Run Database Migrations**
```bash
# Check migration status
node ace migration:status

# Run migrations to create tables
node ace migration:run

# Verify tables were created
mysql -u root -p -e "USE licence_db; SHOW TABLES;"
```

### **Step 6: Generate App Key (if needed)**
```bash
# Generate new app key
node ace generate:key

# Copy the generated key and update .env file
# Replace APP_KEY=your-app-key-here with the generated key
```

### **Step 7: Start Development Server**
```bash
# Start the development server
npm run dev

# Or use the startup script
./start-dev.sh
```

### **Step 8: Verify Everything is Working**
```bash
# In a new terminal, test the API
curl http://localhost:3333/api/users

# Test posts endpoint
curl http://localhost:3333/api/posts

# Open in browser: http://localhost:3333/dashboard
```

## 🚀 **Alternative: Use the Automated Script**

If you prefer, you can use the automated setup script:

```bash
# Make script executable
chmod +x start-dev.sh

# Run the automated setup
./start-dev.sh
```

## 📱 **Access Your Application**

Once everything is running:

- **🌐 Dashboard**: http://localhost:3333/dashboard
- **📡 API**: http://localhost:3333/api
- **👥 Users API**: http://localhost:3333/api/users
- **📝 Posts API**: http://localhost:3333/api/posts

## 🚨 **Troubleshooting Common Issues**

### **Port Already in Use**
```bash
# Check what's using port 3333
lsof -i :3333

# Kill the process
kill -9 <PID>
```

### **Database Connection Failed**
```bash
# Check MySQL service
brew services list | grep mysql

# Restart MySQL if needed
brew services restart mysql

# Test connection
mysql -u root -p -e "SELECT 1;"
```

### **Permission Denied on Scripts**
```bash
# Fix script permissions
chmod +x start-dev.sh
chmod +x setup-cpanel.sh
```

### **Node Modules Issues**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### **Missing npm Scripts**
```bash
# Check available scripts
npm run

# If "dev" script is missing, check package.json
cat package.json | grep -A 10 '"scripts"'
```

## ✅ **Verification Checklist**

- [ ] Node.js installed (v18.16.0+)
- [ ] MySQL installed and running
- [ ] Database `licence_db` created
- [ ] Dependencies installed (`npm install`)
- [ ] Environment file created (`.env`)
- [ ] Migrations run successfully
- [ ] App key generated and set
- [ ] Server starts without errors
- [ ] API endpoints responding
- [ ] Dashboard accessible in browser

## 🚀 **Quick Start Commands (Copy-Paste)**

```bash
# Complete setup in one go
cd /Users/ariobaskoro/quantum/forosta/licence
npm install
cp env.development .env
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS licence_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
node ace migration:run
npm run dev
```

## 📁 **Project Structure After Setup**

```
licence/
├── 📁 app/                    # Application code (Controllers, Models)
├── 📁 config/                 # Configuration files
├── 📁 database/               # Database migrations
├── 📁 public/                 # Static files
├── 📁 resources/              # Views and assets
├── 📁 start/                  # Application startup
├── 📁 tests/                  # Test files
├── 📁 node_modules/           # Dependencies
├── 📄 .adonisrc.json          # AdonisJS configuration
├── 📄 .env                    # Current environment (auto-generated)
├── 📄 .env.development        # Development environment template
├── 📄 .env.production         # Production environment template
├── 📄 .env.example            # Environment example
├── 📄 package.json            # Project dependencies
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 README.md               # Clean, focused documentation
├── 📄 setup-cpanel.sh         # cPanel production setup script
├── 📄 start-dev.sh            # Local development startup script
├── 📄 CPANEL_CHECKLIST.md     # cPanel deployment checklist
├── 📄 CPANEL_DEPLOYMENT.md    # cPanel deployment guide
└── 📄 LOCAL_SETUP_GUIDE.md    # This file
```

## 🔧 **Available Commands**

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run test             # Run tests

# Database
node ace migration:run   # Run migrations
node ace migration:status # Check migration status

# AdonisJS
node ace generate:key    # Generate app key
node ace --help          # Show all commands
```

## 🌐 **API Endpoints**

### **Users**
- `GET /api/users` - List all users
- `POST /api/users` - Create new user

### **Posts**
- `GET /api/posts` - List all posts
- `POST /api/posts` - Create new post

## 🗄️ **Database Schema**

### **Users Table**
- `id` (string, primary key)
- `email` (string, unique)
- `name` (string)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### **Posts Table**
- `id` (string, primary key)
- `title` (string)
- `content` (text)
- `published` (boolean)
- `author_id` (string, foreign key to users)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## 🔒 **Environment Variables**

Your `.env` file should contain:

```env
NODE_ENV=development
PORT=3333
HOST=127.0.0.1
APP_KEY=your-app-key-here
APP_NAME=Licence
APP_URL=http://localhost:3333

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root1234
DB_NAME=licence_db

# Session
SESSION_DRIVER=cookie
SESSION_COOKIE_NAME=adonis-session

# Cache
CACHE_VIEWS=false

# Logging
LOG_LEVEL=info

# Drive
DRIVE_DISK=local

# Security
HASH_DRIVER=bcrypt
```

## 📚 **Additional Resources**

- **README.md** - Project overview and features
- **CPANEL_DEPLOYMENT.md** - Production deployment guide
- **CPANEL_CHECKLIST.md** - Production deployment checklist

## 🆘 **Need Help?**

If you encounter issues:

1. **Check this guide** - Make sure you followed all steps
2. **Check error messages** - Look for specific error details
3. **Verify prerequisites** - Ensure Node.js and MySQL are properly installed
4. **Check file permissions** - Make sure scripts are executable
5. **Restart services** - Restart MySQL if database issues persist

---

**🎉 Your Forosta Licence application should now be running locally!**

**Next Steps**: Once local development is working, you can proceed to cPanel production deployment using the other guides in this project.
