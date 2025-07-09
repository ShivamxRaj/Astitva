@echo off
echo Starting Nirman Sewa Development Environment...

echo Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo Failed to install backend dependencies
    pause
    exit /b 1
)

echo Installing frontend dependencies...
cd ../frontend
call npm install
if errorlevel 1 (
    echo Failed to install frontend dependencies
    pause
    exit /b 1
)

echo Starting backend server...
start cmd /k "cd ../backend && npm run dev"

echo Starting frontend server...
start cmd /k "cd ../frontend && npm start"

echo Development servers are starting...
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:3000 