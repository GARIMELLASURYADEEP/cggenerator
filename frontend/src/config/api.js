// API Configuration
const API_CONFIG = {
  // Production backend URL (Railway)
  PRODUCTION_URL: 'https://cggenerator-production.up.railway.app',
  // Development backend URL
  DEVELOPMENT_URL: 'http://localhost:8000',
  // Get the appropriate URL based on environment
  getBaseURL: () => {
    // Check if we're in production (deployed)
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return API_CONFIG.PRODUCTION_URL;
    }
    return API_CONFIG.DEVELOPMENT_URL;
  }
};

export default API_CONFIG;
