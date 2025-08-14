# 🚀 cPanel Production Checklist for Forosta Licence

## ✅ Pre-Deployment Checklist

### 1. cPanel Requirements
- [ ] **Node.js**: Available in your cPanel (version 18.16.0+)
- [ ] **SSH Access**: Available for running Node.js applications
- [ ] **MySQL**: Available for database hosting
- [ ] **File Manager**: Access to upload and manage files

### 2. Environment Setup
- [ ] `env.production` file updated with your database credentials
- [ ] Production app key generated
- [ ] Database credentials verified:
  - **Host**: `localhost`
  - **User**: `forostaj_ario`
  - **Password**: `Uzw~oqv-sQ3F`
  - **Database**: `forostaj_licence_db`

### 3. Database Preparation in cPanel
- [ ] Go to cPanel → MySQL Databases
- [ ] Create database: `forostaj_licence_db`
- [ ] Create user: `forostaj_ario`
- [ ] Set password: `Uzw~oqv-sQ3F`
- [ ] Add user to database with ALL PRIVILEGES
- [ ] Test database connection

### 4. Application Build
- [ ] Dependencies installed (`npm ci`)
- [ ] Application built (`npm run build`)
- [ ] `server.js` file generated
- [ ] TypeScript compilation successful

## 🚀 Quick cPanel Production Setup

### Option 1: Automated Setup (Recommended)
```bash
# Run the automated cPanel production setup
./setup-cpanel.sh
```

This script will:
- ✅ Set up production environment
- ✅ Install dependencies
- ✅ Build the application
- ✅ Create cPanel startup scripts
- ✅ Create .htaccess file
- ✅ Create cron job script
- ✅ Generate deployment guide

### Option 2: Manual Setup
```bash
# 1. Set production environment
cp env.production .env

# 2. Generate app key
node ace generate:key

# 3. Install dependencies
npm ci

# 4. Build application
npm run build

# 5. Create database in cPanel MySQL Databases
# 6. Run migrations
NODE_ENV=production node ace migration:run
```

## 🎯 Starting Production Application in cPanel

### Quick Start
```bash
# Start production application
./start-cpanel.sh
```

### Background Start (Recommended)
```bash
# Start in background with logging
nohup ./start-cpanel.sh > app.log 2>&1 &
```

### Using cPanel Cron Jobs (Most Reliable)
1. Go to cPanel → Cron Jobs
2. Add this command:
   ```bash
   */5 * * * * /home/username/path/to/your/project/cron-start.sh
   ```
3. This will check every 5 minutes if your app is running and restart it if needed

## 🔧 cPanel Production Management Commands

### Application Status
```bash
# Check if app is running
ps aux | grep "node server.js"

# Check port usage
netstat -tlnp | grep :3333

# Check process details
pgrep -f "node server.js"
```

### Application Control
```bash
# Stop application
pkill -f "node server.js"

# Start application
./start-cpanel.sh

# Restart application
pkill -f "node server.js" && nohup ./start-cpanel.sh > app.log 2>&1 &
```

### Logs and Monitoring
```bash
# View application logs
tail -f app.log

# View last 100 lines
tail -n 100 app.log

# Search logs for errors
grep "ERROR" app.log

# Monitor logs in real-time
tail -f app.log | grep -E "(ERROR|WARN|INFO)"
```

### Application Testing
```bash
# Test API endpoints
curl http://localhost:3333/api/users
curl http://localhost:3333/api/posts

# Test frontend
curl http://localhost:3333/dashboard

# Health check
curl -f http://localhost:3333/api/users || echo "Application not responding"
```

## 📊 cPanel-Specific Monitoring

### Log Files
- **Application logs**: `app.log` (created when using nohup)
- **cPanel error logs**: Check cPanel → Error Logs
- **cPanel access logs**: Check cPanel → Access Logs

### Health Check
```bash
# Check if application is responding
curl -f http://localhost:3333/api/users || echo "App not responding"

# Check if process is running
if pgrep -f "node server.js" > /dev/null; then
    echo "✅ Application is running"
else
    echo "❌ Application is not running"
fi
```

## 🌐 cPanel Domain Configuration

### Option 1: Subdomain
1. Go to cPanel → Subdomains
2. Create subdomain (e.g., `app.yourdomain.com`)
3. Point to your project directory
4. Access via: `https://app.yourdomain.com`

### Option 2: Addon Domain
1. Go to cPanel → Addon Domains
2. Add your domain
3. Point to your project directory
4. Access via: `https://yourdomain.com`

### Option 3: Subdirectory
1. Upload to a subdirectory (e.g., `/licence`)
2. Access via: `https://yourdomain.com/licence`

## 🔒 cPanel Security Checklist

- [ ] Environment variables properly set in .env
- [ ] Database user has minimal required privileges
- [ ] Application running on internal port (3333)
- [ ] .htaccess file configured for security
- [ ] File permissions set correctly
- [ ] SSL certificate configured (if using domain)
- [ ] Database credentials secure

## 🚨 cPanel Troubleshooting

### Common Issues

1. **Permission Denied**
   ```bash
   # Fix file permissions
   chmod +x *.sh
   chmod 644 .env
   chmod 755 public/
   ```

2. **Port Already in Use**
   ```bash
   # Check what's using port 3333
   lsof -i :3333
   # Kill the process if needed
   kill -9 <PID>
   ```

3. **Application Not Starting**
   ```bash
   # Check logs
   tail -f app.log
   
   # Check Node.js version
   node --version
   
   # Check if dependencies are installed
   ls -la node_modules
   
   # Check environment variables
   cat .env
   ```

4. **Database Connection Failed**
   ```bash
   # Test database connection
   mysql -h localhost -u forostaj_ario -pUzw~oqv-sQ3F -e "SELECT 1;" forostaj_licence_db
   
   # Check if MySQL is running
   ps aux | grep mysql
   ```

5. **Process Dies After SSH Disconnect**
   ```bash
   # Use nohup for background processes
   nohup ./start-cpanel.sh > app.log 2>&1 &
   
   # Or use cPanel cron jobs for automatic restarts
   ```

## 📱 cPanel Production URLs

- **Local Access**: `http://localhost:3333`
- **API Base**: `http://localhost:3333/api`
- **Users API**: `http://localhost:3333/api/users`
- **Posts API**: `http://localhost:3333/api/posts`
- **Dashboard**: `http://localhost:3333/dashboard`

## 🎯 Next Steps After cPanel Deployment

1. **Set up domain/subdomain** in cPanel
2. **Configure SSL certificate** (Let's Encrypt available in cPanel)
3. **Set up automated restarts** using cron jobs
4. **Monitor application** performance and logs
5. **Set up backups** for your database and files
6. **Configure email** settings if needed

## 📞 cPanel Support

### Where to Get Help
- **cPanel Error Logs**: Check cPanel → Error Logs
- **cPanel Access Logs**: Check cPanel → Access Logs
- **Application Logs**: Check `app.log` file
- **Hosting Provider**: Contact your hosting provider for Node.js support

### Useful cPanel Commands
```bash
# Check cPanel version
cat /usr/local/cpanel/version

# Check available Node.js versions
ls /opt/alt/alt-nodejs*/

# Check system resources
top
df -h
free -h
```

---

**🎉 Your Forosta Licence application is ready for cPanel production!**

**📚 For detailed instructions, see: CPANEL_DEPLOYMENT.md**
