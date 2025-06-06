import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { toggleSubscription, isChannelFollowedBysubscriber } from "../../utils/api";
import { UserContext } from "../../contexts/UserContext";
import { motion } from "framer-motion";

const SubscriberCard = ({ Subscriber, isProfile }) => {
  const [isFollowed, setIsFollowed] = useState(null);
  const [followCount, setFollowCount] = useState(0);
  const { userDetail } = useContext(UserContext);

  const channelId = isProfile ? Subscriber?.subscriber?._id : Subscriber.channel._id;
  const avatar = isProfile ? Subscriber.subscriber.avatar : Subscriber.channel.avatar;
  const fullName = isProfile ? Subscriber.subscriber.fullName : Subscriber.channel.fullName;
  const username = isProfile ? Subscriber.subscriber.username : Subscriber?.channel?.username;
  const subscribersCount = isProfile ? Subscriber.subscriber.subscribersCount : Subscriber.channel.subscribersCount;

  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (channelId) {
        try {
          const data = await isChannelFollowedBysubscriber(channelId);
          setIsFollowed(data.statusCode);
        } catch (error) {
          console.error("Error checking Follow status:", error);
        }
      }
    };
    fetchFollowStatus();
  }, [channelId]);

  useEffect(() => {
    if (subscribersCount !== undefined) {
      setFollowCount(subscribersCount);
    }
  }, [subscribersCount]);

  const handleFollowToggle = async () => {
    try {
      const response = await toggleSubscription(channelId);
      if (!response?.data?.success) {
        setIsFollowed((prev) => !prev);
        setFollowCount((prev) =>
          prev !== null ? (isFollowed ? prev - 1 : prev + 1) : prev
        );
        console.error("Failed to toggle Follow.");
      }
    } catch (error) {
      console.error("Error toggling Follow:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-[#1e1e1e] border border-gray-700 text-white rounded-lg p-4 flex items-center justify-between gap-4 hover:shadow-lg transition"
    >
      {/* Left side - Avatar and Text */}
      <div className="flex items-center gap-4 min-w-0 overflow-hidden">
        <img
          src={avatar}
          alt={fullName}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-purple-600"
        />
        <div className="min-w-0">
          <Link to={`/profile/${username}`}>
            <p className="font-semibold text-white truncate hover:underline">
              {fullName}
            </p>
          </Link>
          <p className="text-gray-400 text-sm truncate">{followCount} Followers</p>
        </div>
      </div>

      {/* Right side - Button */}
      {channelId !== userDetail?._id && (
        <button
          onClick={handleFollowToggle}
          className={`px-5 py-2 rounded-md font-medium whitespace-nowrap transition ${
            !isFollowed
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </button>
      )}
    </motion.div>
  );
};

export default SubscriberCard;
