#!/bin/bash

# 🚀 Local Development Startup Script for Forosta Licence
# This script starts your AdonisJS application in development mode

echo "🚀 Starting Forosta Licence Development Server"
echo "=============================================="

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from development template..."
    if [ -f "env.development" ]; then
        cp env.development .env
        echo "✅ .env file created from env.development"
    else
        echo "❌ env.development not found. Please create .env manually."
        exit 1
    fi
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if database is ready
echo "🗄️  Checking database connection..."
if node ace migration:status > /dev/null 2>&1; then
    echo "✅ Database connection successful"
else
    echo "⚠️  Database connection failed. Please check your database setup."
    echo "   You can run: node ace migration:run"
fi

# Start development server
echo "🌐 Starting development server..."
echo "   API: http://localhost:3333/api"
echo "   Dashboard: http://localhost:3333/dashboard"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
