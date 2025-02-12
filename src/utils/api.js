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
    //console.log(response.data.message.docs)
    return response.data.message.docs;
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

// API fetch tokens
export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}users/refresh-token`,
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

// API toggle Subscription
export const toggleSubscription = async (channelId) => {
  try {
    const response = await axios.post(`${BASE_URL}subscription/c/${channelId}/toggle`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

// API fetch user profile
export const getUserProfile = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}users/c/${username}`, { withCredentials: true });
    //console.log(response)
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
  
};

// Fetch video by id
export const getVideoDetails = async (videoId) => {
  try {
    const response = await axios.get(`${BASE_URL}videos/${videoId}`, { withCredentials: true });
    //console.log(' ------------------> ', response)
    return response.data.message;
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

// Fatch user Videos
export const getUserAllVideos = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}videos?userId=${userId}`, { withCredentials: true });
    //console.log("-------------------", response)
    return response.data.message.docs;
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

// increment video view
export const incrementVideoView = async (videoId) => {
  try {
    const response = await axios.patch(`${BASE_URL}videos/views/${videoId}`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const addComment = async (videoId, text) => {
  try {
    const response = await axios.post(
      `${BASE_URL}comment/${videoId}`,
      { text }, 
      { withCredentials: true }
    );
    //console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error);
    throw error.response?.data || error;
  }
};


export const fetchComments = async (videoId, page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${BASE_URL}comment/${videoId}?page=${page}&limit=${limit}`,
      { withCredentials: true }
    );

    if (!response.data || !response.data.success) {
      console.error("Invalid API response:", response.data);
      return { comments: [], totalComments: 0 };
    }

    return {
      comments: response.data.message?.comments || [],
      totalComments: response.data.message?.totalComments || 0,
    };
  } catch (error) {
    console.error("API Error:", error.response?.data || error);
    return { comments: [], totalComments: 0 };
  }
};



export const updateComment = async (commentId, text) => {
  try {
    const response = await axios.patch(`${BASE_URL}comment/c/${commentId}`, { text }, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(`${BASE_URL}comment/c/${commentId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const toggleVideoLike = async (videoId) => {
  try {
      const response = await axios.post(`${BASE_URL}like/toggle/v/${videoId}`, {}, { withCredentials: true });
      return response;
  } catch (error) {
      console.error("toggleVideoLike API Error:", error.response?.data || error);
  }
};

export const isVideosLikeByUser = async (videoId) => {
  try {
      const response = await axios.post(`${BASE_URL}like/check/v/${videoId}`, {}, { withCredentials: true });
      return response.data;
  } catch (error) {
      console.error("toggleVideoLike API Error:", error.response?.data || error);
  }
};

export const getLikeVideos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}like/videos`, {
      withCredentials: true,
    });

    const likedVideos = response.data.message.map((item) => ({
      ...item, 
      uploader: {
        username: item.uploader?.username,
        fullName: item.uploader?.fullName,
        avatar: item.uploader?.avatar,
      },
      likedAt: item.likedAt,
    }));

    return likedVideos;
  } catch (error) {
    console.error("API Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

