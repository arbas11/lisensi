# 🚨 cPanel Troubleshooting Guide

## ❌ **Common Errors & Solutions**

### **1. Memory Issues (Core Dumped, Aborted)**

**Error:** `sh: line 1: 2751143 Aborted (core dumped)`

**Causes:**
- Insufficient memory allocation
- Node.js process killed by system
- Large dependency installation

**Solutions:**

#### **Option A: Use Optimized Installation Scripts**
```bash
# Try the robust setup script first
npm run cpanel:setup:robust

# Or use step-by-step approach
npm run cpanel:setup:step
```

#### **Option B: Manual Step-by-Step Installation**
```bash
# Step 1: Install with memory optimization
npm install --production --no-optional --no-audit --no-fund --maxsockets=1 --prefer-offline

# Step 2: Run migrations
node ace migration:run

# Step 3: Seed database
node ace db:seed

# Step 4: Build application
node ace build --production
```

#### **Option C: Minimal Installation**
```bash
# Most minimal installation possible
npm install --production --no-optional --no-audit --no-fund --maxsockets=1 --prefer-offline --no-shrinkwrap
```

### **2. Permission Denied Errors**

**Error:** `EACCES: permission denied`

**Solutions:**
```bash
# Set correct file permissions
find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;

# Make specific files executable
chmod +x ace
chmod +x cpanel-start.js
chmod +x cpanel-setup.js
```

### **3. Node.js Version Issues**

**Error:** `SyntaxError: Unexpected token` or version compatibility issues

**Solutions:**
1. **Use cPanel Node.js Selector** to set correct version
2. **Recommended:** Node.js 16.x or 18.x
3. **Check compatibility** with your AdonisJS version

### **4. Database Connection Issues**

**Error:** `ECONNREFUSED` or database connection failures

**Solutions:**
1. **Check .env file** for correct database credentials
2. **Verify database exists** and is accessible
3. **Check firewall settings** on hosting provider
4. **Use correct database host** (localhost vs external IP)

## 🔧 **Memory Optimization Techniques**

### **1. Increase Node.js Memory Limit**
```bash
# Set higher memory limit for Node.js
export NODE_OPTIONS="--max-old-space-size=2048"

# Or in your start script
node --max-old-space-size=2048 ace serve --production
```

### **2. Use Production Dependencies Only**
```bash
# Install only production dependencies
npm install --production

# Skip optional dependencies
npm install --production --no-optional

# Skip audit and funding
npm install --production --no-optional --no-audit --no-fund
```

### **3. Optimize npm Configuration**
```bash
# Reduce concurrent connections
npm config set maxsockets 1

# Use offline mode when possible
npm install --prefer-offline

# Skip shrinkwrap
npm install --no-shrinkwrap
```

## 📋 **Step-by-Step Recovery Process**

### **When Setup Fails:**

1. **Check Error Logs:**
   ```bash
   # Check cPanel error logs
   tail -f error_log
   
   # Check Node.js logs
   tail -f nodejs.log
   ```

2. **Verify Environment:**
   ```bash
   # Check if you're in the right directory
   pwd
   ls -la
   
   # Verify essential files exist
   ls -la ace package.json
   ```

3. **Try Alternative Installation:**
   ```bash
   # Use the robust setup script
   npm run cpanel:setup:robust
   
   # Or manual installation
   npm run cpanel:install:minimal
   ```

4. **Check Resource Usage:**
   ```bash
   # Monitor memory usage
   free -h
   
   # Check disk space
   df -h
   ```

## 🎯 **Recommended Setup Order**

### **For New cPanel Deployments:**

1. **Upload Files** to cPanel
2. **Set Permissions** (755 for dirs, 644 for files)
3. **Generate App Key:** `npm run generate:key`
4. **Configure .env** with database credentials
5. **Run Robust Setup:** `npm run cpanel:setup:robust`
6. **Start Application:** `npm run cpanel:start`
7. **Configure Domain** in Node.js Selector

### **For Failed Deployments:**

1. **Clean Installation:**
   ```bash
   rm -rf node_modules package-lock.json
   npm cache clean --force
   ```

2. **Try Minimal Installation:**
   ```bash
   npm run cpanel:install:minimal
   ```

3. **Run Setup Manually:**
   ```bash
   node ace migration:run
   node ace db:seed
   node ace build --production
   ```

## 🆘 **Getting Help**

### **When All Else Fails:**

1. **Check cPanel Support** - Your hosting provider may have specific solutions
2. **Review Error Logs** - Look for specific error messages
3. **Try Different Node.js Version** - Some versions work better on cPanel
4. **Contact Hosting Support** - They may need to increase memory limits

### **Useful Commands for Debugging:**

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check available memory
free -h

# Check disk space
df -h

# Check file permissions
ls -la

# Test database connection
node -e "console.log('Node.js is working')"
```

---
**Remember: cPanel hosting often has resource limitations. The robust setup script is designed to work around these limitations.** 🎯✨
