import React from 'react';
import { VideoGrid, EmptyState } from '../../components';
import { useVideoContext } from '../../contexts/VideoContext';

const HomePage = () => {
  const { videos, loading, error } = useVideoContext();

  return (
    <div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : videos.length > 0 ? (
        <VideoGrid videos={videos} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default HomePage;
