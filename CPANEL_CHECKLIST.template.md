# 🚀 cPanel Production Checklist for Forosta Licence

## 📋 **Pre-Deployment Checklist**

### **Database Setup**
- [ ] Create database: `your_database_name`
- [ ] Create user: `your_database_user`
- [ ] Set password: `your_secure_password`
- [ ] Grant all privileges to user on database
- [ ] Test database connection

### **File Upload & Configuration**
- [ ] Upload project files to cPanel
- [ ] Extract files to desired directory
- [ ] Set proper file permissions
- [ ] Copy template files to actual config files
- [ ] Edit `env.production` with real credentials
- [ ] Edit `setup-cpanel.sh` with real credentials

### **Dependencies & Build**
- [ ] Install Node.js dependencies: `npm install --production`
- [ ] Run database migrations: `node ace migration:run`
- [ ] Seed database: `node ace db:seed`
- [ ] Build application: `npm run build`

## 🚀 **Deployment Checklist**

### **Server Startup**
- [ ] Start server: `npm run start`
- [ ] Verify server is running: `ps aux | grep node`
- [ ] Check application logs
- [ ] Test application in browser

### **Configuration Verification**
- [ ] Database connection working
- [ ] All routes accessible
- [ ] License search functionality working
- [ ] Admin panel accessible (if needed)
- [ ] Error pages displaying correctly

## 🔧 **Post-Deployment Checklist**

### **Monitoring & Maintenance**
- [ ] Set up log monitoring
- [ ] Configure auto-restart (cron job)
- [ ] Test backup procedures
- [ ] Verify security settings
- [ ] Document deployment process

### **Performance & Security**
- [ ] Enable caching if needed
- [ ] Verify HTTPS/SSL configuration
- [ ] Check file permissions
- [ ] Review error logs
- [ ] Test under load

## 📝 **Important Notes**

### **Security Reminders**
- **NEVER commit** real credentials to Git
- **Always use templates** and fill in credentials locally
- **Keep credentials secure** and don't share them
- **Regularly rotate** database passwords

### **File Management**
- **Template files** (safe to commit):
  - `env.development.template`
  - `env.production.template`
  - `setup-cpanel.template.sh`
  - `CPANEL_SETUP_GUIDE.template.md`
  - `CPANEL_CHECKLIST.template.md`

- **Configuration files** (NEVER commit):
  - `env.development`
  - `env.production`
  - `setup-cpanel.sh`

## ✅ **Final Verification**

1. **Application running** and accessible
2. **Database connected** and migrations applied
3. **All functionality** working correctly
4. **Error handling** working properly
5. **Security measures** in place
6. **Documentation** updated and secure

---

**🔒 SECURITY CHECKLIST COMPLETE - No real credentials in version control!**
