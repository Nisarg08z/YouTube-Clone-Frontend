import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const VideoCard = ({ video }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-72">
      {/* Thumbnail Section */}
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-40 object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
          {formatDuration(video.duration)}
        </span>
      </div>

      {/* Video Details */}
      <div className="p-3">
        <div className="flex items-start space-x-3">
          {/* Avatar */}
          <img
            src={video.uploader.avatar}
            alt="avatar image"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="text-white font-medium text-sm truncate">
              {truncateDescription(video.description)}
            </h3>
            <p className="text-gray-400 text-xs">
              {video.uploader.fullName}
            </p>
            <p className="text-gray-400 text-xs">
              {formatViews(video.views)} views • {formatCreatedAt(video.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility Functions
const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const formatViews = (views) => {
  if (views >= 1e6) return `${(views / 1e6).toFixed(1)}M`;
  if (views >= 1e3) return `${(views / 1e3).toFixed(1)}K`;
  return views;
};

const formatCreatedAt = (createdAt) => {
  return formatDistanceToNow(new Date(createdAt)) + ' ago';
};

// Truncate description if it exceeds 27 characters
const truncateDescription = (description) => {
  if (description.length > 27) {
    return description.slice(0, 27) + '...';
  }
  return description;
};

export default VideoCard;
