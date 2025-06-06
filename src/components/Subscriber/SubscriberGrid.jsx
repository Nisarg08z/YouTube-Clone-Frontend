import React from "react";
import SubscriberCard from "./SubscriberCard";

const SubscriberGrid = ({ Subscribers, isProfile = false }) => {
  return (
    <div className="flex flex-col gap-4">
      {Subscribers.map((subscriber) => (
        <SubscriberCard
          key={subscriber._id}
          Subscriber={subscriber}
          isProfile={isProfile}
        />
      ))}
    </div>
  );
};

export default SubscriberGrid;
