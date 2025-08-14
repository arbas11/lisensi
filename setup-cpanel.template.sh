#!/bin/bash

# cPanel Setup Script Template
# Copy this file to setup-cpanel.sh and fill in your actual values
# NEVER commit the actual setup-cpanel.sh file with real credentials

echo "Setting up Forosta Licence System for cPanel..."

# Database Configuration
DB_HOST="localhost"
DB_USER="your_cpanel_db_user"
DB_PASSWORD="your_cpanel_db_password"
DB_NAME="your_cpanel_db_name"

# Application Configuration
APP_KEY="your-production-app-key-here"
NODE_ENV="production"

echo "Database: $DB_NAME on $DB_HOST"
echo "User: $DB_USER"
echo "Environment: $NODE_ENV"

# Create production environment file
cat > env.production << EOF
NODE_ENV=production
HOST=127.0.0.1
PORT=3333
APP_KEY=$APP_KEY
DB_CONNECTION=mysql
DB_HOST=$DB_HOST
DB_PORT=3306
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD
DB_NAME=$DB_NAME
CACHE_VIEWS=true
LOG_LEVEL=error
DRIVE_DISK=local
HASH_DRIVER=bcrypt
MAIL_DRIVER=smtp
MAIL_HOST=localhost
MAIL_PORT=587
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
EOF

echo "Production environment file created."
echo "Please review env.production before proceeding."
