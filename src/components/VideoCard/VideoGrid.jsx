import React from 'react';
import VideoCard from './VideoCard';

const VideoGrid = ({ videos, hideUploader, isHorizontal, playList }) => {
  return isHorizontal ? (
    <div className="w-full flex flex-col items-center space-y-3">
      {videos.map((video) => (
        <div key={video._id} className="w-full">
          <VideoCard
            video={video}
            hideUploader={hideUploader}
            isHorizontal={isHorizontal}
            playList={playList}
          />
        </div>
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
      {videos.map((video) => (
        <VideoCard
          key={video._id}
          video={video}
          hideUploader={hideUploader}
          isHorizontal={isHorizontal}
          playList={playList}
          className="justify-self-start"
        />
      ))}
    </div>
  );
};

export default VideoGrid;
