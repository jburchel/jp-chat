import axios from 'axios';
import config from '../config/config';

const BASE_URL = config.JOSHUA_PROJECT_BASE_URL;

// Add CORS headers in the request
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// @docs - Using Joshua Project API v2
const joshuaProjectApi = {
  // Get people groups
  getPeopleGroups: async (params = {}) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/people_groups`, {
        params: {
          api_key: config.JOSHUA_PROJECT_API_KEY,
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
      const response = await axiosInstance.get(`${BASE_URL}/languages`, {
        params: {
          api_key: config.JOSHUA_PROJECT_API_KEY,
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
      const response = await axiosInstance.get(`${BASE_URL}/countries`, {
        params: {
          api_key: config.JOSHUA_PROJECT_API_KEY,
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