# PowerShell Script to Create .env File
# Run this script: .\create-env.ps1

Write-Host "Creating .env file..." -ForegroundColor Green

$envContent = @"
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/pharmacy

# JWT Authentication
JWT_SECRET=pharmacy_super_secret_jwt_key_2024_change_this_in_production
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
"@

$envContent | Out-File -FilePath .env -Encoding utf8 -NoNewline

Write-Host "✅ .env file created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  Don't forget to:" -ForegroundColor Yellow
Write-Host "   1. Update JWT_SECRET with a strong random key" -ForegroundColor Yellow
Write-Host "   2. Add Cloudinary credentials if you need file uploads" -ForegroundColor Yellow
Write-Host ""





