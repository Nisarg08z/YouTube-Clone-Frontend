import React from 'react';

const EmptyLikePage = () => {
  return (
    <div className="flex flex-col items-center mt-auto justify-center h-full text-gray-400">
      <img src={`../assets/icons/liked.png`} alt="Empty" className="h-16 mb-4" />
      <p className="text-lg">No Liked videos available</p>
      <p>Please try to search something else.</p>
    </div>
  );
};

export default EmptyLikePage;