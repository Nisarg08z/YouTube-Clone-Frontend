import React from 'react';

const EmptyHistoryPage = () => {
  return (
    <div className="flex flex-col items-center mt-60 justify-center h-full text-gray-400">
      <img src={`../assets/icons/history.png`} alt="Empty" className="h-16 mb-4" />
      <p className="text-lg">No videos available</p>
      <p>Please try to search something else.</p>
    </div>
  );
};

export default EmptyHistoryPage;
