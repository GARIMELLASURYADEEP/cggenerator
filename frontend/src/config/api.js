// API Configuration
const API_CONFIG = {
  // Get the appropriate URL based on environment
  getBaseURL: () => {
    // In production (deployed), use the same URL as the frontend
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return window.location.origin; // Use the same domain as the frontend
    }
    return 'http://localhost:8000'; // Development
  }
};

export default API_CONFIG;
