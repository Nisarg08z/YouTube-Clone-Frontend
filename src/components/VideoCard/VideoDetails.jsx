import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { getUserProfile } from "../../utils/api";
import { Link } from "react-router-dom";

// Utility functions
const formatViewsFollower = (views) => {
    if (!views) return "0";
    if (views >= 1e6) return `${(views / 1e6).toFixed(1)}M`;
    if (views >= 1e3) return `${(views / 1e3).toFixed(1)}K`;
    return views.toString();
};

const formatCreatedAt = (createdAt) => {
    return createdAt ? formatDistanceToNow(new Date(createdAt)) + " ago" : "N/A";
};

const VideoDetails = ({ video }) => {
    const [showFull, setShowFull] = useState(false);
    const [user, setUser] = useState(null);
    const maxLength = 70;

    useEffect(() => {
        const fetchUser = async () => {
            if (video?.uploader?.username) {
                try {
                    const data = await getUserProfile(video.uploader.username);
                    setUser(data);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            }
        };

        fetchUser();
    }, [video?.uploader?.username]);

    return (
        <div className="bg-black w-full text-white p-4 rounded-lg border border-gray-700 relative transition-all duration-300">
            {/* Title and Views */}
            <p className="text-lg font-bold break-words h-auto w-[75%]">
                {video?.description?.slice(0, maxLength) || "No Description"}
                {video?.description?.length > maxLength && !showFull && " ..."}
                {showFull && video?.description?.length > maxLength && (
                    <span className="text-gray-300">{video?.description?.slice(maxLength)}</span>
                )}
            </p>
            <p className="text-gray-400 text-sm">
                {formatViewsFollower(video?.views)} Views • {formatCreatedAt(video?.createdAt)}
            </p>

            {/* Profile Section */}
            <Link to={`/profile/${video?.uploader?.username}`} >
                <div className="flex items-center mt-3">
                    <img
                        src={user?.data?.avatar || "https://via.placeholder.com/40"}
                        alt={video?.uploader?.username || "User"}
                        className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-3">
                        <p className="font-bold">{video?.uploader?.username || "Unknown"}</p>
                        <p className="text-gray-400 text-sm">{user?.data?.subscribersCount || 0} Followers</p>
                    </div>
                </div>
            </Link>

            {/* Buttons Section */}
            <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
                <div className="flex space-x-2 pb-2">
                    <button className="bg-gray-800 px-3 py-1 rounded-lg text-white">
                        <img src="/assets/icons/liked.png" alt="liked" className="h-6" />
                    </button>
                    <button className="bg-gray-800 px-4 py-2 rounded-lg text-white flex items-center">
                        <img src="/assets/icons/collection.png" alt="collection" className="h-6" />
                        <span className="ml-2">Save</span>
                    </button>
                </div>
                <button className="bg-purple-600 px-4 py-1 rounded-lg">Follow</button>

                {/* "More" Button BELOW Follow */}
                {video?.description?.length > maxLength && (
                    <button onClick={() => setShowFull(!showFull)} className="text-white mt-2 flex bottom-3">
                        {showFull ? "Show Less" : "More"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default VideoDetails;
