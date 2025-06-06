import React from 'react';

const EmptyFollowPage = () => {
  return (
    <div className="flex flex-col items-center mt-auto justify-center h-full text-gray-400">
      <img src={`../assets/icons/subscribers.png`} alt="Empty" className="h-16 mb-4" />
      <p className="text-lg">No subscribed channels found.</p>
      <p>Please try to search something else.</p>
    </div>
  );
};

export default EmptyFollowPage;
