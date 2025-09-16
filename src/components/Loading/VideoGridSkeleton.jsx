import React from 'react';

const VideoGridSkeleton = ({ count = 12 }) => {
  const items = Array.from({ length: count });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((_, idx) => (
        <div key={idx} className="w-full animate-pulse">
          <div className="w-full aspect-video bg-[#2c2c2c] rounded-lg" />
          <div className="flex mt-3 space-x-3">
            <div className="w-10 h-10 bg-[#2c2c2c] rounded-full" />
            <div className="flex-1">
              <div className="h-4 bg-[#2c2c2c] rounded w-3/4 mb-2" />
              <div className="h-4 bg-[#2c2c2c] rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoGridSkeleton;


