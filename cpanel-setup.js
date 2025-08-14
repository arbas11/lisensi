#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 cPanel Setup Script for AdonisJS License System\n');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n${step} ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// Check if we're in the right directory
function checkEnvironment() {
  logStep('🔍', 'Checking environment...');
  
  if (!fs.existsSync('ace')) {
    logError('ace file not found. Make sure you\'re in the project root directory.');
    logInfo('Current directory: ' + process.cwd());
    return false;
  }
  
  if (!fs.existsSync('package.json')) {
    logError('package.json not found. Make sure you\'re in the project root directory.');
    return false;
  }
  
  logSuccess('Environment check passed');
  return true;
}

// Install dependencies with memory optimization
function installDependencies() {
  logStep('📦', 'Installing dependencies (optimized for cPanel)...');
  
  try {
    // Try light installation first
    logInfo('Attempting light installation...');
    execSync('npm install --production --no-optional --no-audit --no-fund --maxsockets=1 --prefer-offline', {
      cwd: __dirname,
      stdio: 'inherit',
      maxBuffer: 1024 * 1024 * 10 // 10MB buffer
    });
    logSuccess('Dependencies installed successfully');
    return true;
  } catch (error) {
    logWarning('Light installation failed, trying minimal installation...');
    
    try {
      execSync('npm install --production --no-optional --no-audit --no-fund --maxsockets=1 --prefer-offline --no-shrinkwrap', {
        cwd: __dirname,
        stdio: 'inherit',
        maxBuffer: 1024 * 1024 * 10
      });
      logSuccess('Dependencies installed with minimal flags');
      return true;
    } catch (minimalError) {
      logError('Minimal installation also failed');
      logError('Error: ' + minimalError.message);
      return false;
    }
  }
}

// Run migrations
function runMigrations() {
  logStep('🗄️', 'Running database migrations...');
  
  try {
    execSync('node ace migration:run', {
      cwd: __dirname,
      stdio: 'inherit'
    });
    logSuccess('Migrations completed successfully');
    return true;
  } catch (error) {
    logError('Migration failed: ' + error.message);
    return false;
  }
}

// Seed database
function seedDatabase() {
  logStep('🌱', 'Seeding database...');
  
  try {
    execSync('node ace db:seed', {
      cwd: __dirname,
      stdio: 'inherit'
    });
    logSuccess('Database seeded successfully');
    return true;
  } catch (error) {
    logError('Database seeding failed: ' + error.message);
    return false;
  }
}

// Build the application
function buildApplication() {
  logStep('🏗️', 'Building application for production...');
  
  try {
    execSync('node ace build --production', {
      cwd: __dirname,
      stdio: 'inherit'
    });
    logSuccess('Application built successfully');
    return true;
  } catch (error) {
    logError('Build failed: ' + error.message);
    return false;
  }
}

// Main setup function
async function runSetup() {
  log('Starting cPanel setup process...\n');
  
  // Step 1: Environment check
  if (!checkEnvironment()) {
    process.exit(1);
  }
  
  // Step 2: Install dependencies
  if (!installDependencies()) {
    logError('Setup failed at dependency installation step');
    logInfo('Try running: npm run cpanel:install:minimal');
    process.exit(1);
  }
  
  // Step 3: Run migrations
  if (!runMigrations()) {
    logError('Setup failed at migration step');
    logInfo('Check your database connection and try again');
    process.exit(1);
  }
  
  // Step 4: Seed database
  if (!seedDatabase()) {
    logError('Setup failed at database seeding step');
    logInfo('Check your database connection and try again');
    process.exit(1);
  }
  
  // Step 5: Build application
  if (!buildApplication()) {
    logWarning('Build failed, but core setup is complete');
    logInfo('You can try building manually with: npm run cpanel:build');
  }
  
  log('\n🎉 cPanel setup completed successfully!');
  log('\n📋 Next steps:');
  log('1. Generate app key: npm run generate:key', 'cyan');
  log('2. Start application: npm run cpanel:start', 'cyan');
  log('3. Configure your domain in cPanel Node.js Selector', 'cyan');
  log('4. Set up environment variables in .env file', 'cyan');
  
  log('\n🚨 Important:');
  log('- Delete generate-key.js after generating your app key', 'yellow');
  log('- Keep your .env file secure', 'yellow');
  log('- Monitor your application logs', 'yellow');
}

// Handle process termination
process.on('SIGINT', () => {
  log('\n\n⚠️  Setup interrupted by user', 'yellow');
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('\n\n⚠️  Setup terminated', 'yellow');
  process.exit(0);
});

// Run the setup
runSetup().catch(error => {
  logError('Unexpected error during setup: ' + error.message);
  process.exit(1);
});
