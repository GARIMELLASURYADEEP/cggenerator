#!/bin/bash

# Build the frontend
echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Start the backend (which will also serve the frontend)
echo "Starting backend server..."
cd backend
python main.py
