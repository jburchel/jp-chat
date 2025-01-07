import axios from 'axios';

const BASE_URL = 'https://joshuaproject.net/api/v2';

// @docs - Using Joshua Project API v2
const joshuaProjectApi = {
  // Get people groups
  getPeopleGroups: async (params = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}/people_groups`, {
        params: {
          api_key: process.env.REACT_APP_JOSHUA_PROJECT_API_KEY,
          ...params
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching people groups:', error);
      throw error;
    }
  },

  // Get languages
  getLanguages: async (params = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}/languages`, {
        params: {
          api_key: process.env.REACT_APP_JOSHUA_PROJECT_API_KEY,
          ...params
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching languages:', error);
      throw error;
    }
  },

  // Get countries
  getCountries: async (params = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}/countries`, {
        params: {
          api_key: process.env.REACT_APP_JOSHUA_PROJECT_API_KEY,
          ...params
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      throw error;
    }
  }
};

export default joshuaProjectApi; 