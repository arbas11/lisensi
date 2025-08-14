# 🚀 Forosta Licence - AdonisJS Application

A modern web application built with AdonisJS 5, featuring user management, posts, and a beautiful dashboard interface.

## ✨ Features

- **User Management**: Create and manage users
- **Post System**: Create and manage posts with author relationships
- **Modern UI**: Beautiful dashboard with Tailwind CSS
- **RESTful API**: Full API endpoints for users and posts
- **Database**: MySQL database with Lucid ORM
- **Production Ready**: Optimized for cPanel deployment

## 🛠️ Tech Stack

- **Backend**: AdonisJS 5 (Node.js framework)
- **Database**: MySQL with Lucid ORM
- **Frontend**: Edge templates with Tailwind CSS
- **Language**: TypeScript
- **Package Manager**: npm

## 📋 Prerequisites

- **Node.js**: Version 18.16.0 or higher
- **MySQL**: Database server (local or cPanel)
- **npm**: Package manager

## 🚀 Quick Start

### Local Development

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment**
   ```bash
   cp env.development .env
   ```

3. **Set up database**
   ```bash
   # Create database and run migrations
   node ace migration:run
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access your application**
   - **API**: http://localhost:3333/api
   - **Dashboard**: http://localhost:3333/dashboard

### cPanel Production Deployment

1. **Upload your project** to cPanel
2. **Run the setup script**
   ```bash
   chmod +x setup-cpanel.sh
   ./setup-cpanel.sh
   ```
3. **Set up database** in cPanel MySQL Databases
4. **Start your application**
   ```bash
   ./start-cpanel.sh
   ```

## 📁 Project Structure

```
licence/
├── app/                    # Application code
│   ├── Controllers/       # HTTP controllers
│   └── Models/           # Database models
├── config/                # Configuration files
├── database/              # Database migrations
├── public/                # Static files
├── resources/             # Views and assets
├── start/                 # Application startup
├── .env                   # Environment variables
├── setup-cpanel.sh        # cPanel setup script
└── README.md              # This file
```

## 🔧 Available Commands

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

## 🌐 API Endpoints

### Users
- `GET /api/users` - List all users
- `POST /api/users` - Create new user

### Posts
- `GET /api/posts` - List all posts
- `POST /api/posts` - Create new post

## 🗄️ Database Schema

### Users Table
- `id` (string, primary key)
- `email` (string, unique)
- `name` (string)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Posts Table
- `id` (string, primary key)
- `title` (string)
- `content` (text)
- `published` (boolean)
- `author_id` (string, foreign key to users)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## 🔒 Environment Variables

Create a `.env` file with these variables:

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
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name

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

## 📚 Documentation

- **Local Development**: See setup steps above
- **cPanel Deployment**: See `CPANEL_DEPLOYMENT.md`
- **cPanel Checklist**: See `CPANEL_CHECKLIST.md`

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   lsof -i :3333
   kill -9 <PID>
   ```

2. **Database connection failed**
   - Verify database credentials
   - Ensure MySQL service is running
   - Check database permissions

3. **Build failed**
   ```bash
   rm -rf build server.js
   npm run build
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**🎉 Your Forosta Licence application is ready for development and production!**
