# 🚀 How to Run Online Pharmacy System

## Prerequisites

Before running the project, make sure you have:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - [Download](https://www.mongodb.com/try/download/community)
3. **npm** (comes with Node.js)

## Step-by-Step Setup

### Step 1: Install Dependencies

Open terminal in the project folder and run:

```bash
npm install
```

This will install all required packages for both frontend and backend.

### Step 2: Setup Environment Variables

Create a `.env` file in the root directory (`pharmacy/` folder):

**Option 1: Create manually**
Create a new file named `.env` in the root folder and add:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB - Use your MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/pharmacy

# JWT Secret - Change this to a random string
JWT_SECRET=pharmacy_super_secret_jwt_key_2024_change_in_production
JWT_EXPIRE=7d

# Cloudinary (Optional - for file uploads)
# Get credentials from https://cloudinary.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

**Option 2: Copy from example (if exists)**
```bash
copy .env.example .env
# Then edit .env and fill in your values
```

### Step 3: Start MongoDB

**Windows:**
- If MongoDB is installed as a service, it should start automatically
- Or run manually: `mongod`
- Or use MongoDB Compass GUI

**Check if MongoDB is running:**
```bash
# Try connecting
mongosh
# Or
mongo
```

If connection fails, start MongoDB service or run `mongod` command.

### Step 4: Run the Application

You need **TWO terminal windows** - one for backend, one for frontend.

#### Terminal 1 - Backend Server

```bash
npm run dev:server
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

#### Terminal 2 - Frontend

```bash
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 5: Access the Application

- **Frontend:** Open browser and go to `http://localhost:5173`
- **Backend API:** `http://localhost:5000`
- **API Health Check:** `http://localhost:5000/api/health`

## Quick Start Commands

```bash
# Install dependencies (first time only)
npm install

# Start MongoDB (if not running as service)
mongod

# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend  
npm run dev
```

## Troubleshooting

### ❌ MongoDB Connection Error

**Problem:** `MongoDB connection error`

**Solutions:**
1. Make sure MongoDB is installed and running
2. Check if MongoDB service is running:
   ```bash
   # Windows
   net start MongoDB
   ```
3. Verify MONGODB_URI in `.env` file
4. Try connecting manually: `mongosh` or `mongo`

### ❌ Port Already in Use

**Problem:** `Port 5000 is already in use`

**Solutions:**
1. Change PORT in `.env` file to another port (e.g., 5001)
2. Or kill the process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

### ❌ Module Not Found

**Problem:** `Cannot find module 'xxx'`

**Solution:**
```bash
npm install
```

### ❌ Frontend Can't Connect to Backend

**Problem:** API calls failing

**Solutions:**
1. Make sure backend is running on port 5000
2. Check `vite.config.js` has proxy configuration
3. Verify `FRONTEND_URL` in `.env`

### ❌ JWT Token Errors

**Problem:** Authentication not working

**Solution:**
- Make sure `JWT_SECRET` is set in `.env` file
- Restart the backend server after changing `.env`

## Testing the Setup

### 1. Test Backend Health
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Pharmacy API is running"
}
```

### 2. Test Frontend
- Open `http://localhost:5173`
- You should see the home page
- Try registering a new user

### 3. Test API Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Production Build

To build for production:

```bash
# Build frontend
npm run build

# Start backend (production)
npm run server
```

## Project Structure

```
pharmacy/
├── server/          # Backend code
├── src/             # Frontend code
├── public/          # Static files
├── .env             # Environment variables (create this)
├── package.json     # Dependencies
└── vite.config.js   # Vite configuration
```

## Need Help?

- Check `README.md` for detailed documentation
- Check `server/BACKEND_GUIDE.md` for backend details
- Check `docs/` folder for diagrams and test cases

## Default User Roles

After registration, users are assigned roles:
- **customer** - Default role for new users
- **pharmacist** - Can review prescriptions
- **admin** - Full system access

To create an admin user, you can:
1. Register normally, then update role in database
2. Or modify the registration to allow role selection (for testing)

---

**Happy Coding! 🎉**





