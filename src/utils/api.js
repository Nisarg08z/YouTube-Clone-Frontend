export const fetchAPI = async (endpoint, options = {}) => {
  const BASE_URL = 'http://localhost:8000/api/v1/';

  const { method = 'GET', body = null } = options;

  const fetchOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);

    if (!response.ok) {
      throw new Error('API request failed');
    }

    if (method === 'GET') {
      return response.json();
    }

    return response.json();
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
};

export const getVideos = async () => {
  return fetchAPI('videos');
};

export const signUpUser = async (formData) => {
  return fetchAPI('users/register', {
    method: 'POST',
    body: formData,
  });
};

export const loginUser = async (formData) => {
  return fetchAPI('users/login', {
    method: 'POST',
    body: formData,
  });
};
