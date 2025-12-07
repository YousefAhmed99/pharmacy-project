@echo off
echo ========================================
echo   Starting Online Pharmacy System
echo ========================================
echo.

echo Checking if .env exists...
if not exist .env (
    echo ERROR: .env file not found!
    echo Please run setup.bat first or create .env manually
    pause
    exit /b 1
)

echo Starting Backend Server...
start "Pharmacy Backend" cmd /k "npm run dev:server"

timeout /t 3 /nobreak >nul

echo Starting Frontend...
start "Pharmacy Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   Servers Starting...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window (servers will keep running)
pause >nul





