import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { toggleSubscription, isChannelFollowedBysubscriber } from "../../utils/api";
import { UserContext } from "../../contexts/UserContext";

const SubscriberCard = ({ Subscriber, isProfile }) => {

    const [isFollowed, setIsFollowed] = useState(null);
    const [followCount, setFollowCount] = useState(0);
    const { userDetail } = useContext(UserContext);

    //console.log(isProfile)

    const channelId = isProfile ? Subscriber?.subscriber?._id : Subscriber.channel._id;
    const avatar = isProfile ? Subscriber.subscriber.avatar : Subscriber.channel.avatar;
    const fullName = isProfile ? Subscriber.subscriber.fullName : Subscriber.channel.fullName;
    const username = isProfile ? Subscriber.subscriber.username : Subscriber?.channel?.username;
    const subscribersCount = isProfile ? Subscriber.subscriber.subscribersCount : Subscriber.channel.subscribersCount

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
                setFollowCount((prev) => (prev !== null ? (isFollowed ? prev - 1 : prev + 1) : prev));
                console.error("Failed to toggle Follow.");
            }
        } catch (error) {
            console.error("Error toggling Follow:", error);
        }
    };

    return (
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg flex items-center justify-between mb-4">
            <div className="flex items-center">
                <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover mr-4"
                />
                <div>
                    <Link to={`/profile/${username}`}>
                        <p className="text-white font-bold">{fullName}</p>
                    </Link>
                    <p className="text-gray-400 text-sm">{followCount} Followers</p>
                </div>
            </div>
            {(channelId !== userDetail?._id) && (<button
                onClick={handleFollowToggle}
                className={`px-4 py-1 rounded-lg ${!isFollowed ? "bg-purple-600" : "bg-gray-800"}`}
            >
                {isFollowed ? "Unfollow" : "Follow"}
            </button>)}
        </div>
    );
};

export default SubscriberCard;
