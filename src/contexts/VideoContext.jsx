import React, { createContext, useContext, useState } from 'react';
import { getVideos, getUserAllVideos } from '../utils/api';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [uservideos, setuserVideos] = useState([]);
  const [allvideos, setallVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchAllVideos = async () => {
    setLoading(true);
    try {
      const { videos, pagination } = await getVideos("", 1, 20);
      setallVideos(videos);
      setPage(pagination.nextPage || 2);
      setHasMore(pagination.hasNextPage);
      //console.log("all" , data)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreVideos = async () => {
    if (!hasMore || isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const { videos, pagination } = await getVideos("", page, 20);
      setallVideos((prev) => [...prev, ...videos]);
      setPage(pagination.nextPage || page + 1);
      setHasMore(pagination.hasNextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const fetchUserVideos = async (userId) => {
    setLoading(true);
    try {
      const data = await getUserAllVideos(userId);
      setuserVideos(data);
      //console.log("user" , data)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <VideoContext.Provider value={{ uservideos, allvideos, loading, error, fetchAllVideos, fetchUserVideos, loadMoreVideos, hasMore, isLoadingMore }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  return useContext(VideoContext);
};
