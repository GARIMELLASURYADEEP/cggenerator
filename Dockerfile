FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js for frontend build
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Copy backend requirements and install Python dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy frontend package files and install Node dependencies
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy all source code
COPY . .

# Build the frontend
RUN cd frontend && npm run build

# Copy backend code
COPY backend/ ./backend/

# Expose port
EXPOSE 8000

# Start the FastAPI backend (which will serve both frontend and backend)
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]