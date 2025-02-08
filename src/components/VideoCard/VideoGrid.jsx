import React from 'react';
import VideoCard from './VideoCard';

const VideoGrid = ({ videos, hideUploader }) => {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} hideUploader={hideUploader}/>
      ))}
    </div>
  );
};

export default VideoGrid;
