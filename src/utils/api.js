import axios from 'axios';

const BASE_URL = 'http://localhost:8001/api/v1/';

// Login API
export const loginUser = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}users/login`,
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

// Logout API
export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}users/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

// API fetch videos
export const getVideos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}videos`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

// API sign up
export const signUpUser = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}users/register`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

// API fetch current user
export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}users/current-user`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};
