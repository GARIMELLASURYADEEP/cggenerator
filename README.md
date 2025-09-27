# Tech Certificate Generator

A full-stack web application for generating professional tech certificates.

## Features

- Choose from 5 tech domains (AI, Web Development, Cyber Security, Data Science, Cloud Computing)
- Generate professional certificates with unique IDs
- Download certificates as PNG images
- Responsive design with modern UI

## Tech Stack

- **Backend**: FastAPI (Python)
- **Frontend**: React with Tailwind CSS
- **Storage**: File-based (no database required)

## Quick Start

### Local Development

1. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python main.py
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Access**: http://localhost:3000

## Deployment

### Deploy to Render (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy Backend**:
   - Go to [render.com](https://render.com)
   - Create new "Web Service"
   - Connect your GitHub repo
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Deploy!

3. **Deploy Frontend**:
   - Create new "Static Site"
   - Connect your GitHub repo
   - Set build command: `npm install && npm run build`
   - Set publish directory: `build`
   - Add environment variable: `REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com`
   - Deploy!

### Alternative: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Railway will auto-detect both services
4. Deploy!

## Project Structure

```
├── backend/
│   ├── main.py          # FastAPI application
│   ├── models.py         # Pydantic models
│   ├── database.py       # File-based storage
│   ├── requirements.txt  # Python dependencies
│   └── Dockerfile        # Docker configuration
├── frontend/
│   ├── src/
│   │   ├── pages/        # React components
│   │   └── App.js        # Main app component
│   ├── package.json      # Node dependencies
│   └── Dockerfile        # Docker configuration
└── README.md
```

## Environment Variables

### Backend
- `MONGO_URL`: Database URL (optional, uses file storage by default)
- `DB_NAME`: Database name (optional)

### Frontend
- `REACT_APP_BACKEND_URL`: Backend API URL

## License

MIT License - feel free to use this project!
