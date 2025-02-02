import React, { useState, useEffect } from "react";
import { getUserProfile } from "../../utils/api";
import {VideosList, Playlist, TweetsList, FollowingList} from "../../components/profile";
import { useParams } from "react-router-dom";

const Profile = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null)
    const [activeTab, setActiveTab] = useState("Videos");
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserProfile(username);
                setUser(data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUser();
    }, [username]);

    console.log("--------------", user)
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
                    src={user.data.coverImage}
                    alt="coverImage"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="relative flex items-center p-6 -mt-16" >
                <img
                    src={user.data.avatar}
                    alt="avatar"
                    className="w-40 h-40 rounded-full"
                />
                <div className="ml-4">
                    <h1 className="text-2xl font-semibold">{user.data.fullName}</h1>
                    <p className="text-gray-400">@{user.data.username}</p>
                    <p className="text-sm text-gray-500">
                        {user.data.subscribersCount} Subscribers
                    </p>
                </div>
                <button className="ml-auto bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                    Follow
                </button>
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
            {activeTab === "Videos" && <VideosList />}
            {activeTab === "Playlist" && <Playlist />}
            {activeTab === "Tweets" && <TweetsList />}
            {activeTab === "Following" && <FollowingList />}
        </div>
    );
};

export default Profile;
