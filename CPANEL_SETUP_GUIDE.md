# 🚀 **Complete cPanel Deployment Guide for Forosta Licence**

This guide will walk you through deploying your Forosta Licence application to cPanel hosting, step by step.

## 📋 **Prerequisites (Before You Start)**

### **1. cPanel Access**
- ✅ **cPanel Login**: Username and password for your hosting account
- ✅ **Domain**: Your domain name (e.g., `yourdomain.com`)
- ✅ **Hosting Plan**: cPanel hosting with Node.js support
- ✅ **MySQL Databases**: Access to create/manage databases

### **2. Local Project Ready**
- ✅ **Project Working**: Local development environment fully functional
- ✅ **Database Migrations**: All migrations tested locally
- ✅ **Environment Files**: `env.production` configured
- ✅ **Build Working**: `npm run build` successful locally

## 🗄️ **Step 1: Database Setup in cPanel**

### **1.1 Access cPanel MySQL Databases**
```bash
# Login to cPanel
# Navigate to: Databases > MySQL Databases
```

### **1.2 Create Database**
```bash
# In cPanel MySQL Databases section:
# 1. Create New Database
#    - Database Name: forostaj_licence_db
#    - Click "Create Database"

# 2. Create Database User
#    - Username: forostaj_ario
#    - Password: Uzw~oqv-sQ3F
#    - Click "Create User"

# 3. Add User to Database
#    - Select User: forostaj_ario
#    - Select Database: forostaj_licence_db
#    - Privileges: ALL PRIVILEGES
#    - Click "Add"
```

### **1.3 Verify Database Creation**
```bash
# In cPanel, you should see:
# Database: forostaj_licence_db
# User: forostaj_ario
# Status: Active
```

## 📁 **Step 2: Upload Project to cPanel**

### **2.1 Prepare Project for Upload**
```bash
# In your local project directory
cd /Users/ariobaskoro/quantum/forosta/licence

# Build the project for production
npm run build

# Verify build files
ls -la build/
ls -la server.js
```

### **2.2 Upload via File Manager**
```bash
# 1. Login to cPanel
# 2. Navigate to: Files > File Manager
# 3. Navigate to: public_html (or your domain folder)
# 4. Upload these files/folders:
#    - build/ (entire folder)
#    - server.js
#    - package.json
#    - package-lock.json
#    - .env.production
#    - setup-cpanel.sh
#    - start-cpanel.sh
#    - cron-start.sh
#    - public/.htaccess
```

### **2.3 Upload via FTP/SFTP (Alternative)**
```bash
# Using FileZilla or similar FTP client:
# Host: your-domain.com
# Username: your-cpanel-username
# Password: your-cpanel-password
# Port: 21 (FTP) or 22 (SFTP)

# Upload the same files as above
```

## ⚙️ **Step 3: Environment Configuration**

### **3.1 Rename Environment File**
```bash
# In cPanel File Manager:
# 1. Navigate to your project folder
# 2. Rename .env.production to .env
# 3. Edit .env file
```

### **3.2 Update Environment Variables**
```bash
# Edit .env file in cPanel File Manager:
NODE_ENV=production
PORT=3333
HOST=127.0.0.1
APP_KEY=your-production-app-key-here
APP_NAME=Licence
APP_URL=https://yourdomain.com

# Database - Production (cPanel MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_USER=forostaj_ario
DB_PASSWORD=Uzw~oqv-sQ3F
DB_NAME=forostaj_licence_db

# Session
SESSION_DRIVER=cookie
SESSION_COOKIE_NAME=adonis-session

# Cache
CACHE_VIEWS=false

# Logging
LOG_LEVEL=info

# Drive (File Storage)
DRIVE_DISK=local

# Security
HASH_DRIVER=bcrypt

# Mail (cPanel default)
MAIL_DRIVER=smtp
MAIL_HOST=localhost
MAIL_PORT=587
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=
MAIL_FROM_NAME=
```

### **3.3 Generate Production App Key**
```bash
# In cPanel Terminal (if available):
# Navigate to your project folder
cd public_html/your-project-folder

# Generate new app key
node ace generate:key

# Copy the generated key and update .env file
# Replace APP_KEY=your-production-app-key-here
```

## 🚀 **Step 4: Install Dependencies & Setup**

### **4.1 Access cPanel Terminal**
```bash
# In cPanel:
# 1. Navigate to: Advanced > Terminal
# 2. Or use SSH if available
```

### **4.2 Navigate to Project Directory**
```bash
# In cPanel Terminal:
cd public_html
ls -la

# Navigate to your project folder
cd your-project-folder
pwd
ls -la
```

### **4.3 Install Dependencies**
```bash
# Install production dependencies
npm ci --only=production

# Verify installation
ls -la node_modules
```

### **4.4 Run Database Migrations**
```bash
# Check migration status
node ace migration:status

# Run migrations
node ace migration:run

# Verify tables created
node ace migration:status
```

## 🌐 **Step 5: Start Application**

### **5.1 Test Application Start**
```bash
# Test if application starts
node server.js

# If successful, you should see:
# "Server is running on port 3333"
# Press Ctrl+C to stop
```

### **5.2 Create Startup Scripts**
```bash
# Make scripts executable
chmod +x setup-cpanel.sh
chmod +x start-cpanel.sh
chmod +x cron-start.sh

# Test startup script
./start-cpanel.sh
```

### **5.3 Start Application in Background**
```bash
# Start application using nohup
nohup node server.js > app.log 2>&1 &

# Check if running
ps aux | grep "node server.js"

# Check logs
tail -f app.log
```

## ⏰ **Step 6: Setup Cron Job (Auto-Restart)**

### **6.1 Access cPanel Cron Jobs**
```bash
# In cPanel:
# Navigate to: Advanced > Cron Jobs
```

### **6.2 Create Cron Job**
```bash
# Cron Job Settings:
# Common Settings: Every 5 minutes
# Command: /usr/local/bin/php /home/username/public_html/your-project-folder/cron-start.sh

# Or manually set:
# Minute: */5
# Hour: *
# Day: *
# Month: *
# Weekday: *
# Command: /home/username/public_html/your-project-folder/cron-start.sh
```

### **6.3 Test Cron Job**
```bash
# Manually run cron job to test
./cron-start.sh

# Check if application is running
ps aux | grep "node server.js"
```

## 🔧 **Step 7: Domain Configuration**

### **7.1 Subdomain Setup (Recommended)**
```bash
# In cPanel:
# 1. Navigate to: Domains > Subdomains
# 2. Create Subdomain:
#    - Subdomain: api (or app)
#    - Domain: yourdomain.com
#    - Document Root: public_html/your-project-folder/public
# 3. Click "Create"
```

### **7.2 Domain/Subdomain Pointing**
```bash
# Your application will be accessible at:
# Main: https://yourdomain.com
# API: https://api.yourdomain.com (if subdomain created)
# Dashboard: https://yourdomain.com/dashboard
```

## 🧪 **Step 8: Testing & Verification**

### **8.1 Test API Endpoints**
```bash
# Test users endpoint
curl https://yourdomain.com/api/users

# Test posts endpoint
curl https://yourdomain.com/api/posts

# Test dashboard
curl https://yourdomain.com/dashboard
```

### **8.2 Test Database Connection**
```bash
# In cPanel Terminal:
node ace migration:status

# Should show: "Database connection successful"
```

### **8.3 Check Application Logs**
```bash
# Check application logs
tail -f app.log

# Check error logs
tail -f error.log
```

## 🚨 **Troubleshooting Common Issues**

### **Port Already in Use**
```bash
# Check what's using port 3333
lsof -i :3333

# Kill the process
kill -9 <PID>

# Restart application
./start-cpanel.sh
```

### **Database Connection Failed**
```bash
# Verify database credentials in .env
# Check if database exists in cPanel
# Verify user permissions
# Test connection manually
```

### **Application Not Starting**
```bash
# Check logs
tail -f app.log

# Verify .env file exists
ls -la .env

# Check file permissions
ls -la *.sh
```

### **Cron Job Not Working**
```bash
# Check cron job syntax
# Verify script path is correct
# Test script manually
./cron-start.sh
```

### **Domain Not Accessible**
```bash
# Check DNS propagation
# Verify subdomain configuration
# Check .htaccess file
# Test with different browsers
```

## ✅ **Deployment Verification Checklist**

- [ ] Database created in cPanel MySQL
- [ ] Project files uploaded to hosting
- [ ] Environment file configured (.env)
- [ ] Dependencies installed (`npm ci --only=production`)
- [ ] Database migrations run successfully
- [ ] Application starts without errors
- [ ] Startup scripts created and executable
- [ ] Cron job configured for auto-restart
- [ ] Domain/subdomain configured
- [ ] API endpoints responding
- [ ] Dashboard accessible
- [ ] Application running in background
- [ ] Logs being generated

## 🚀 **Quick Deployment Commands (Copy-Paste)**

```bash
# Complete deployment in one go
cd public_html/your-project-folder
npm ci --only=production
cp .env.production .env
node ace generate:key
# Update .env with generated key
node ace migration:run
chmod +x *.sh
nohup node server.js > app.log 2>&1 &
./cron-start.sh
```

## 📁 **Final Project Structure on cPanel**

```
public_html/your-project-folder/
├── 📁 build/                   # Built application files
├── 📁 node_modules/            # Production dependencies
├── 📁 public/                  # Static files with .htaccess
├── 📄 server.js                # Production server
├── 📄 package.json             # Project dependencies
├── 📄 .env                     # Production environment
├── 📄 setup-cpanel.sh          # cPanel setup script
├── 📄 start-cpanel.sh          # Application startup script
├── 📄 cron-start.sh            # Cron job script
├── 📄 app.log                  # Application logs
└── 📄 error.log                # Error logs
```

## 🔒 **Security Considerations**

### **File Permissions**
```bash
# Set proper file permissions
chmod 644 .env
chmod 755 *.sh
chmod 755 public/
```

### **Environment Variables**
```bash
# Never commit .env to version control
# Use strong APP_KEY
# Secure database credentials
# Disable debug mode in production
```

### **HTTPS Configuration**
```bash
# Enable SSL certificate in cPanel
# Force HTTPS redirects
# Secure cookies and sessions
```

## 📊 **Monitoring & Maintenance**

### **Regular Checks**
```bash
# Check application status
ps aux | grep "node server.js"

# Monitor logs
tail -f app.log

# Check database connection
node ace migration:status
```

### **Updates & Maintenance**
```bash
# Update dependencies
npm update

# Restart application
./start-cpanel.sh

# Check for errors
tail -f error.log
```

## 📚 **Additional Resources**

- **LOCAL_SETUP_GUIDE.md** - Local development setup
- **CPANEL_DEPLOYMENT.md** - Detailed deployment guide
- **CPANEL_CHECKLIST.md** - Deployment checklist
- **README.md** - Project overview

## 🆘 **Need Help?**

If you encounter issues:

1. **Check this guide** - Make sure you followed all steps
2. **Check cPanel logs** - Look for specific error details
3. **Verify database setup** - Ensure MySQL is properly configured
4. **Check file permissions** - Make sure scripts are executable
5. **Test manually** - Run commands step by step
6. **Contact hosting support** - For cPanel-specific issues

---

**🎉 Your Forosta Licence application should now be running on cPanel!**

**Access URLs**:
- **Dashboard**: https://yourdomain.com/dashboard
- **API**: https://yourdomain.com/api
- **Users**: https://yourdomain.com/api/users
- **Posts**: https://yourdomain.com/api/posts

**Next Steps**: Monitor the application, set up monitoring, and configure backups.
