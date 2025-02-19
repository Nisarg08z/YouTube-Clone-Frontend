import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1/';

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

export const addToWatchHistory = async (videoId) => {
  try {
    const response = await axios.post(`${BASE_URL}users/add/history`, { videoId }, { withCredentials: true });
    //console.log(response)
    return response.data;
  } catch (error) {
    console.error("addToWatchHistory API Error:", error.response?.data || error);
    throw error;
  }
};

export const getWatchedVideos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}users/history`, {
      withCredentials: true,
    });
    //console.log(response.data)
    return response.data.message;
  } catch (error) {
    console.error('API Error:', error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

// Fetch user playlists
export const getUserPlaylists = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}playlist/user/${userId}`, {
      withCredentials: true,
    });
    return response.data.message;
  } catch (error) {
    console.error("API Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

// Create a new playlist
export const createPlaylist = async (name, description) => {
  try {
    const response = await axios.post(
      `${BASE_URL}playlist/`,
      { name, description },
      { withCredentials: true }
    );
    return response.data.message;
  } catch (error) {
    console.error("API Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

// Save a video to an existing playlist
export const saveVideoToPlaylist = async (playlistId, videoId) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}playlist/add/${videoId}/${playlistId}`,
      {},
      { withCredentials: true }
    );
    return response.data.message;
  } catch (error) {
    console.error("API Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};

export const editPlayList = async (PlayListId, data) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}playlist/${PlayListId}`,
      data,
      { withCredentials: true }
    );
    return response.data.message;
  } catch (error) {
    console.error("API Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
};


export const deletePlayList = async (PlayListId) => {
  try {
    const response = await axios.delete(`${BASE_URL}playlist/${PlayListId}`, 
      {withCredentials: true,}
    );
    return response.data.message;
  } catch (error) {
    console.error("API Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
}

export const getPlaylistById = async (PlayListId) => {
  try {
    const response = await axios.get(`${BASE_URL}playlist/${PlayListId}`, 
      {withCredentials: true,}
    );
    return response.data.message;
  } catch (error) {
    console.error("API Error:", error.response?.data?.message || error.message);
    throw error.response?.data || error;
  }
}

export const isChannelFollowedBysubscriber = async (channelId) => {
  try {
    const response = await axios.post(`${BASE_URL}subscription/check/c/${channelId}`, {}, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("toggleVideoLike API Error:", error.response?.data || error);
  }
};

export const getSubscribedChannels = async () => {
  try {
    const response = await axios.get(`${BASE_URL}subscription/user/subscribed`, {
      withCredentials: true,
    });
    //console.log(response.data.message)
    return response.data.message;
  } catch (error) {
    console.error("API Error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch channels");
  }
};

export const getuserchannelsubscribers = async (channelId) => {
  try {
    const response = await axios.get(`${BASE_URL}subscription/c/${channelId}/subscribers`, {
      withCredentials: true,
    });

    return response.data.message;
  } catch (error) {
    console.error("API Error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch subscribers");
  }
};

export const addTweet = async (content) => {
  try {
    const response = await axios.post(
      `${BASE_URL}tweet/`,
      { content },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error);
    throw error.response?.data || error;
  }
};

export const fetchTweets = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}tweet/user/${userId}`, {
      withCredentials: true,
    });
    return response.data.message; 
  } catch (error) {
    console.error("API Error:", error.response?.data || error);
    throw error.response?.data || error;
  }
};


export const updateTweet = async (tweetId, content) => {
  try {
    const response = await axios.patch(`${BASE_URL}tweet/${tweetId}`, { content }, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteTweet = async (tweetId) => {
  try {
    const response = await axios.delete(`${BASE_URL}tweet/${tweetId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const statsContent = async (channelId) => {
  try {
    console.log(channelId)
    const response = await axios.get(`${BASE_URL}dashboard/stats/${channelId}`, { withCredentials: true });
    console.log(response)
    return response.data.message;
  } catch (error) {
    console.error("Error fetching stats Content:", error);
  }
};

export const videosContent = async (channelId) => {
  try {
    const response = await axios.get(`${BASE_URL}dashboard/videos/${channelId}`, { withCredentials: true });
    return response.data.message;
  } catch (error) {
    console.error("Error fetching videos Content:", error);
  }
};

export const togglePublishVideo = async (videoId) => {
  try {
    const response = await axios.get(`${BASE_URL}/toggle/publish/:videoId${videoId}`, { withCredentials: true });
    return response;
  } catch (error) {
    console.error("Error fetching videos Content:", error);
  }
};

export const deleteVideo = async (videoId) => {
  try {
    await axios.delete(`${BASE_URL}videos/${videoId}`, { withCredentials: true });
    return response
  } catch (error) {
    console.error("Error deleting video:", error);
  }
};

export const editVideo = async (videoId, formData) => {
  try {
    const response = await axios.put(`${BASE_URL}videos/${videoId}`, formData);  
    return response.data;
  } catch (error) {
    console.error("Error updating video:", error);
    throw error;
  }
};


export const publishVideo = async (videoData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}videos`,
      videoData,
      { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
    );
    return response.data;
  } catch (error) {
    console.error("publishVideo API Error:", error.response?.data || error);
    throw error;
  }
};