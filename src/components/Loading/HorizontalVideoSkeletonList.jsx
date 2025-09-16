import React from 'react';

const HorizontalVideoSkeletonList = ({ count = 8 }) => {
  const items = Array.from({ length: count });
  return (
    <div className="w-full flex flex-col space-y-4">
      {items.map((_, idx) => (
        <div key={idx} className="w-full flex space-x-4 animate-pulse">
          <div className="w-64 sm:w-72 md:w-80 aspect-video bg-[#2c2c2c] rounded-lg" />
          <div className="flex-1">
            <div className="h-5 bg-[#2c2c2c] rounded w-2/3 mb-3" />
            <div className="h-4 bg-[#2c2c2c] rounded w-1/2 mb-2" />
            <div className="h-4 bg-[#2c2c2c] rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HorizontalVideoSkeletonList;


