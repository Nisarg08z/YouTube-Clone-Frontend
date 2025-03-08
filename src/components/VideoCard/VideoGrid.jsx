import React from 'react';
import VideoCard from './VideoCard';

const VideoGrid = ({ videos, hideUploader, isHorizontal, playList }) => {
  return (
    <div className={`${isHorizontal ? "flex flex-col space-y-3 w-full" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}`}>
      {videos.map((video) => (
        <VideoCard 
          key={video._id} 
          video={video} 
          hideUploader={hideUploader} 
          isHorizontal={isHorizontal} 
          playList={playList}
        />
      ))}
    </div>
  );
};

export default VideoGrid;

