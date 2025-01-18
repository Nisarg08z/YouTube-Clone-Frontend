import React from 'react';

const VideoCard = ({ video }) => {
  return (
    <div className="bg-gray-800 rounded p-4">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h3 className="text-white text-sm font-medium">{video.title}</h3>
      <p className="text-gray-400 text-xs">
        {video.views} views • {video.uploadTime}
      </p>
    </div>
  );
};

export default VideoCard;
