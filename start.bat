@echo off

REM Build the frontend
echo Building frontend...
cd frontend
npm install
npm run build
cd ..

REM Start the backend (which will also serve the frontend)
echo Starting backend server...
cd backend
python main.py
