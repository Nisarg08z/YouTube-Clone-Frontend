export const fetchAPI = async (endpoint, options = {}) => {
    const BASE_URL = 'http://localhost:8000/api/v1/';
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, options);
      if (!response.ok) throw new Error('API request failed');
      return response.json();
    } catch (error) {
      console.error('API Error:', error.message);
      throw error;
    }
  };
  
  export const getVideos = async () => {
    return fetchAPI('videos');
  };
  