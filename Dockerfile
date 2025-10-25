FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm install
RUN cd frontend && npm install

# Copy source code
COPY . .

# Build the frontend
RUN cd frontend && npm run build

# Install serve to run the production build
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "frontend/build", "-l", "3000"]
