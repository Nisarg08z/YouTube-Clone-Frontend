import React from "react";
import SubscriberCard from "./SubscriberCard";

const SubscriberGrid = ({ Subscribers, isProfile = false }) => {
  //console.log(Subscribers)
  return (
    <div className="">
      {Subscribers.map((Subscriber) => (
        <SubscriberCard key={Subscriber._id} Subscriber={Subscriber} isProfile={isProfile} />
      ))}
    </div>
  );
};

export default SubscriberGrid;
