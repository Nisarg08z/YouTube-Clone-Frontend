export const fetchAPI = async (endpoint, options = {}) => {
  const BASE_URL = 'http://localhost:8001/api/v1/';
  const { method = 'GET', body = null, requireAuth = false } = options;

  // Get the token from local storage (or context/state if you're using that)
  const token = requireAuth ? localStorage.getItem('accessToken') : null;

  const fetchOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(requireAuth && token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

// Login API
import axios from 'axios';

export const loginUser = async (formData) => {
  const response = await axios.post(
    'http://localhost:8001/api/v1/users/login', // Adjust the URL if needed
    formData,
    {
      withCredentials: true, // Include cookies in the request
      headers: {
        'Content-Type': 'application/json', // Ensure proper content type for JSON
      },
    }
  );
  return response.data; // Return the response data
};


// Logout API

export const logoutUser = async () => {

  return fetchAPI('users/logout', {
    method: 'POST',
    requireAuth: true,
  });
};


// Example API usage to fetch videos
export const getVideos = async () => {
  return fetchAPI('videos', { requireAuth: true }); // Use access token for auth
};

// Example API usage to sign up
export const signUpUser = async (formData) => {
  return fetchAPI('users/register', {
    method: 'POST',
    body: formData,
  });
};

// API to fetch the current user
export const fetchCurrentUser = async () => {
  return fetchAPI('users/current-user', { requireAuth: true }); // Use token for current user
};
