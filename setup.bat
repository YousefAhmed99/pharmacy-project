@echo off
echo ========================================
echo   Online Pharmacy System - Setup
echo ========================================
echo.

echo [1/4] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)
echo.

echo [2/4] Creating .env file...
powershell -ExecutionPolicy Bypass -File create-env.ps1
if errorlevel 1 (
    echo ERROR: Failed to create .env file!
    pause
    exit /b 1
)
echo.

echo [3/4] Checking MongoDB...
echo Please make sure MongoDB is running!
echo You can start it with: mongod
echo Or use MongoDB Compass
echo.
pause

echo [4/4] Seeding database...
echo.
echo Do you want to seed the database with initial data? (Y/N)
set /p seed="> "
if /i "%seed%"=="Y" (
    call npm run seed
)
echo.

echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo   1. Make sure MongoDB is running
echo   2. Terminal 1: npm run dev:server
echo   3. Terminal 2: npm run dev
echo.
echo Default login credentials:
echo   Admin:      admin@pharmacy.com / admin123
echo   Pharmacist: pharmacist@pharmacy.com / pharmacist123
echo   Customer:   customer@pharmacy.com / customer123
echo.
pause





