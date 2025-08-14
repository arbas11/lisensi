# 🚀 cPanel Production Setup Guide for Forosta Licence

## 📋 **Prerequisites**

- cPanel hosting account with SSH access
- MySQL database access
- Node.js support (or ability to upload Node.js binaries)
- Domain/subdomain configured

## 🗄️ **Database Setup**

### **1. Create Database**
1. **Login to cPanel**
2. **Go to MySQL Databases**
3. **Create a new database:**
   - **Database Name**: `your_database_name`
   - **Username**: `your_database_user`
   - **Password**: `your_secure_password`

### **2. Database Configuration**
```bash
# Database credentials (replace with your actual values)
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_secure_password
DB_NAME=your_database_name
```

## 🚀 **Application Deployment**

### **1. Upload Project Files**
1. **Upload via File Manager** or **Git clone**
2. **Extract files** to your desired directory
3. **Set proper permissions** (755 for directories, 644 for files)

### **2. Environment Configuration**
1. **Copy template files:**
   ```bash
   cp env.production.template env.production
   cp setup-cpanel.template.sh setup-cpanel.sh
   ```

2. **Edit `env.production`** with your actual database credentials
3. **Edit `setup-cpanel.sh`** with your actual database credentials

### **3. Install Dependencies**
```bash
npm install --production
```

### **4. Database Migration**
```bash
node ace migration:run
node ace db:seed
```

### **5. Build Application**
```bash
npm run build
```

## 🖥️ **Server Startup**

### **Option 1: SSH Terminal (Recommended)**
```bash
# Start server
npm run start

# Or use the setup script
chmod +x setup-cpanel.sh
./setup-cpanel.sh
```

### **Option 2: Background Process**
```bash
nohup npm run start > app.log 2>&1 &
```

### **Option 3: Cron Job (Auto-restart)**
```bash
# Add to crontab (restart every 5 minutes)
*/5 * * * * cd /path/to/your/app && npm run start > app.log 2>&1
```

## 🔧 **Configuration Files**

### **Environment Variables**
- **`env.production`** - Production environment configuration
- **`setup-cpanel.sh`** - Automated setup script

### **Important Notes**
- **NEVER commit** `env.production` or `setup-cpanel.sh` to Git
- **Always use templates** and fill in credentials locally
- **Keep credentials secure** and don't share them

## ✅ **Verification**

1. **Check server status**: `ps aux | grep node`
2. **Test database connection**: `node ace migration:status`
3. **Verify application**: Visit your domain in browser
4. **Check logs**: `tail -f app.log`

## 🆘 **Troubleshooting**

### **Common Issues**
- **Port conflicts**: Change port in `env.production`
- **Database connection**: Verify credentials and permissions
- **File permissions**: Ensure proper read/write access
- **Node.js version**: Use compatible Node.js version

### **Support**
- Check application logs
- Verify database connectivity
- Review environment configuration
- Contact hosting provider if needed

---

**⚠️ SECURITY REMINDER: Never commit real credentials to version control!**
