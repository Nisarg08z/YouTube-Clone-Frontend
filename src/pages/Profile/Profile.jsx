import React, { useState, useEffect, useContext } from "react";
import { getUserProfile, toggleSubscription, isChannelFollowedBysubscriber } from "../../utils/api";
import { VideosList, Playlist, TweetsList, FollowingList } from "../../components/";
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
                    console.error("Error checking Follow status:", error);
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

    const handleProfile = () => {
        navigate(`/profile/${userDetail?.username}`);
    };

    const handleFollowToggle = async () => {
        if (!user?._id || user?._id === userDetail?._id) return;

        try {
            const response = await toggleSubscription(user._id);
            if (response?.statusCode) {
                setIsFollowed((prev) => !prev);
                setFollowCount((prev) => prev + (isFollowed ? -1 : 1));
            } else {
                console.error("Failed to toggle Follow.");
            }
        } catch (error) {
            console.error("Error toggling Follow:", error);
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
        <div className="min-h-screen bg-black text-white">
            {/* Profile Header */}
            <div className="relative w-full h-40">
                <img
                    src={user?.coverImage || "/default-cover.jpg"}
                    alt="coverImage"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative flex items-center p-6 -mt-16">
                <img
                    src={user?.avatar || "/default-avatar.png"}
                    alt="avatar"
                    className="w-40 h-40 rounded-full"
                />
                <div className="ml-4">
                    <h1 className="text-2xl font-semibold">{user?.fullName || "Unknown User"}</h1>
                    <p className="text-gray-400">@{user?.username}</p>
                    <p className="text-sm text-gray-500">{followCount} Subscribers</p>
                </div>
                <div className="ml-auto">
                    {user?._id !== userDetail?._id ? (
                        <button
                            onClick={handleFollowToggle}
                            className={`px-4 py-1 rounded-lg transition ${isFollowed ? "bg-gray-800" : "bg-purple-600"
                                }`}
                        >
                            {isFollowed ? "Unfollow" : "Follow"}
                        </button>
                    ) : (
                        <button
                            onClick={handleProfile}
                            className="px-4 py-1 rounded-lg bg-purple-600 transition"
                        >
                            Your Content
                        </button>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-700">
                {["Videos", "Playlist", "Tweets", "Following"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 text-center ${activeTab === tab ? "border-b-2 border-purple-500 text-white" : "text-gray-400"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="pt-4">
                {activeTab === "Videos" && <VideosList userId={user?._id} />}
                {activeTab === "Playlist" && <Playlist userId={user?._id} />}
                {activeTab === "Tweets" && <TweetsList userId={user?._id} />}
                {activeTab === "Following" && <FollowingList userId={user?._id} isProfile = {true} />}
            </div>
        </div>
    );
};

export default Profile;
