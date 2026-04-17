@echo off
echo ==========================================
echo   Starting Portfolio Platform...
echo ==========================================

:: Start Backend in a new window
echo Launching Backend (Port 5000)...
start "Portfolio Backend" cmd /c "cd backend && node server.js"

:: Start Frontend in a new window
echo Launching Frontend (Port 8080/8081)...
start "Portfolio Frontend" cmd /c "npm run dev"

echo.
echo Both services are starting. Please wait a few seconds.
echo.
echo Frontend: http://localhost:8081
echo Backend:  http://localhost:5000
echo ==========================================
pause
