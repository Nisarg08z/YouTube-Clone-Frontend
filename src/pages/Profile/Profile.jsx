import React, { useState, useEffect, useContext } from "react";
import {
    getUserProfile,
    toggleSubscription,
    isChannelFollowedBysubscriber,
} from "../../utils/api";
import {
    VideosList,
    Playlist,
    TweetsList,
    FollowingList,
} from "../../components/";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("Videos");
    const [isFollowed, setIsFollowed] = useState(null);
    const [followCount, setFollowCount] = useState(0);
    const { userDetail } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserProfile(username);
                setUser(data.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        fetchUser();
    }, [username]);

    useEffect(() => {
        const fetchFollowStatus = async () => {
            if (user?._id) {
                try {
                    const data = await isChannelFollowedBysubscriber(user._id);
                    setIsFollowed(data?.statusCode);
                } catch (error) {
                    console.error("Error checking follow status:", error);
                }
            }
        };
        fetchFollowStatus();
    }, [user?._id]);

    useEffect(() => {
        if (user?.subscribersCount !== undefined) {
            setFollowCount(user.subscribersCount);
        }
    }, [user?.subscribersCount]);

    const handleProfile = () => navigate("/Content");

    const handleFollowToggle = async () => {
        if (!user?._id || user?._id === userDetail?._id) return;
        try {
            const res = await toggleSubscription(user._id);
            if (res?.statusCode) {
                setIsFollowed((prev) => !prev);
                setFollowCount((prev) => prev + (isFollowed ? -1 : 1));
            }
        } catch (e) {
            console.error("Error toggling follow:", e);
        }
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#111] text-white">
            {/* Cover Image */}
            <div className="relative w-full h-36 sm:h-48 md:h-56 lg:h-64">
                <img
                    src={user?.coverImage || "/default-cover.jpg"}
                    alt="coverImage"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Avatar + Info + Follow Button */}
            <div className="flex flex-col sm:flex-row sm:items-center px-4 -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24 relative z-10">
                {/* Avatar */}
                <div className="flex justify-center sm:justify-start w-full sm:w-auto">
                    <img
                        src={user?.avatar || "/default-avatar.png"}
                        alt="avatar"
                        className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-black object-cover"
                    />
                </div>

                {/* User Info */}
                <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left w-full sm:w-auto">
                    <h1 className="text-xl sm:text-2xl font-semibold">{user?.fullName || "Unknown User"}</h1>
                    <p className="text-gray-400">@{user?.username}</p>
                    <p className="text-sm text-gray-500">{followCount} Subscribers</p>
                </div>

                {/* Button - Responsive */}
                <div className="mt-4 sm:mt-0 sm:ml-auto flex justify-center sm:justify-end w-full sm:w-auto">
                    {user?._id !== userDetail?._id ? (
                        <button
                            onClick={handleFollowToggle}
                            className={`px-5 py-1.5 rounded-full text-sm font-medium transition ${isFollowed
                                    ? "bg-gray-700 hover:bg-gray-600"
                                    : "bg-purple-600 hover:bg-purple-700"
                                }`}
                        >
                            {isFollowed ? "Subscribed" : "Subscribe"}
                        </button>
                    ) : (
                        <button
                            onClick={handleProfile}
                            className="px-5 py-1.5 rounded-full text-sm font-medium bg-purple-600 hover:bg-purple-700"
                        >
                            Your Content
                        </button>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-8 border-b border-gray-700 px-4 sm:px-6">
                <div className="flex justify-between text-center text-sm sm:text-base">
                    {["Videos", "Playlist", "Tweets", "Following"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-3 transition-all duration-200 font-medium border-b-2 ${activeTab === tab
                                    ? "border-purple-500 text-white bg-[#1e1e1e]"
                                    : "border-transparent text-gray-400 hover:text-white hover:bg-[#1a1a1a]"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>


            {/* Tab Content */}
            <div className="p-4 sm:p-6">
                {activeTab === "Videos" && <VideosList userId={user?._id} />}
                {activeTab === "Playlist" && <Playlist userId={user?._id} />}
                {activeTab === "Tweets" && <TweetsList userId={user?._id} />}
                {activeTab === "Following" && <FollowingList userId={user?._id} isProfile={true} />}
            </div>
        </div>
    );
};

export default Profile;
