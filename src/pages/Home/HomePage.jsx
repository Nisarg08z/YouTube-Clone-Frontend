import React from 'react';
import {Sidebar, Header, VideoGrid, EmptyState} from '../../components';
import { useVideoContext } from '../../contexts/VideoContext';

const HomePage = () => {
  const { videos, loading, error } = useVideoContext();

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-1 overflow-auto p-4">
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
      </div>
    </div>
  );
};

export default HomePage;
