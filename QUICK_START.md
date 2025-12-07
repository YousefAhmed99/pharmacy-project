# ⚡ Quick Start Guide

## 🎯 Run the Project in 4 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create .env File

Create a file named `.env` in the root folder (`pharmacy/`) with this content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pharmacy
JWT_SECRET=my_secret_key_12345
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

**Note:** For file uploads, also add Cloudinary credentials (optional):
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 3: Start MongoDB

**Windows:**
- If installed as service, it should auto-start
- Or run: `mongod` in a terminal
- Or use MongoDB Compass

**Check if running:**
```bash
mongosh
# If it connects, MongoDB is running ✅
```

### Step 4: Run Both Servers

**Open TWO terminal windows:**

**Terminal 1 - Backend:**
```bash
npm run dev:server
```
✅ Should show: "Server running on http://localhost:5000"

**Terminal 2 - Frontend:**
```bash
npm run dev
```
✅ Should show: "Local: http://localhost:5173/"

### 🎉 Done! 

Open browser: **http://localhost:5173**

---

## 📋 Commands Summary

```bash
# Install (first time only)
npm install

# Start MongoDB (if not running)
mongod

# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev
```

## 🔍 Verify It's Working

1. **Backend:** http://localhost:5000/api/health
   - Should return: `{"status":"OK","message":"Pharmacy API is running"}`

2. **Frontend:** http://localhost:5173
   - Should show the home page

3. **Test Registration:**
   - Go to http://localhost:5173/register
   - Create an account
   - Login

## ❌ Common Issues

**MongoDB not running?**
```bash
mongod
```

**Port 5000 in use?**
- Change PORT in `.env` to 5001
- Or kill process: `taskkill /F /IM node.exe`

**Module not found?**
```bash
npm install
```

**Can't create .env file?**
- Create manually in root folder
- Name it exactly: `.env` (with the dot)
- Copy content from above

---

For detailed instructions, see `HOW_TO_RUN.md`





