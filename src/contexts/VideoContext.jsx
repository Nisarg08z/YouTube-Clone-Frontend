import React, { createContext, useContext, useState, useEffect } from 'react';
import { getVideos, getUserAllVideos } from '../utils/api';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [uservideos, setuserVideos] = useState([]);
  const [allvideos, setallVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllVideos = async () => {
    setLoading(true);
    try {
      const data = await getVideos();
      setallVideos(data);
      console.log("all" , data)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserVideos = async (userId) => {
    setLoading(true);
    try {
      const data = await getUserAllVideos(userId);
      setuserVideos(data);
      console.log("user" , data)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VideoContext.Provider value={{ uservideos, allvideos, loading, error, fetchAllVideos, fetchUserVideos }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  return useContext(VideoContext);
};
