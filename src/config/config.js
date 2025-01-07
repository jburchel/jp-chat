const config = {
  JOSHUA_PROJECT_API_KEY: process.env.REACT_APP_JOSHUA_PROJECT_API_KEY || '080e14ad747e',
  GEMINI_API_KEY: process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyAKsvgf9coH5UD3FhFUju1cw8meKcQB1PE',
  JOSHUA_PROJECT_BASE_URL: 'https://api.joshuaproject.net/v2',
  IS_PRODUCTION: process.env.NODE_ENV === 'production'
};

export default config; 