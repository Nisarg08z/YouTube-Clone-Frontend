import React, { useState, useEffect, useContext } from "react";
import { formatDistanceToNow } from "date-fns";
import { getUserProfile, toggleVideoLike, isVideosLikeByUser, toggleSubscription, isChannelFollowedBysubscriber } from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { CreatePlayListCard } from "../PlayList";
import { UserContext } from "../../contexts/UserContext";
import LoginPrompt from "../LoginPrompt";

const VideoDetails = ({ video, userId }) => {
    const [showFull, setShowFull] = useState(false);
    const [user, setUser] = useState(null);
    const maxLength = 70;
    const [isLiked, setIsLiked] = useState(null);
    const [likesCount, setLikesCount] = useState(null);
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [isFollowed, setIsFollowed] = useState(null);
    const [followCount, setFollowCount] = useState(null);
    const { userDetail, isLogedin } = useContext(UserContext);
    const navigate = useNavigate();
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

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

    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const data = await isVideosLikeByUser(video._id);
                setIsLiked(data.statusCode);
            } catch (error) {
                console.error("Error checking like status:", error);
            }
        };
        fetchLikeStatus();
        setLikesCount(video?.likesCount);
    }, [video._id]);

    useEffect(() => {
        const fetchFollowStatus = async () => {
            try {
                const data = await isChannelFollowedBysubscriber(video.uploader._id);
                setIsFollowed(data.statusCode);
            } catch (error) {
                console.error("Error checking Follow status:", error);
            }
        };
        fetchFollowStatus();
    }, [video.uploader._id]);

    useEffect(() => {
        if (user?.data?.subscribersCount !== undefined) {
            setFollowCount(user.data.subscribersCount);
        }
    }, [user]);

    const handleProfile = () => {
        navigate(`/profile/${userDetail?.username}`);
    };

    const handleLikeToggle = async () => {
        if (!isLogedin) {
            setShowLoginPrompt(true);
            return;
        }
        try {
            const response = await toggleVideoLike(video._id);
            if (response?.data?.success) {
                setIsLiked((prev) => !prev);
                setLikesCount((prev) => (prev !== null ? (isLiked ? prev - 1 : prev + 1) : prev));
            } else {
                console.error("Failed to toggle like.");
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const handleFollowToggle = async () => {
        if (!isLogedin) {
            setShowLoginPrompt(true);
            return;
        }
        if (video?.uploader?._id === userDetail?._id) return;
        try {
            const response = await toggleSubscription(video.uploader._id);
            if (!response?.data?.success) {
                setIsFollowed((prev) => !prev);
                setFollowCount((prev) => (prev !== null ? (isFollowed ? prev - 1 : prev + 1) : prev));
                console.error("Failed to toggle Follow.");
            }
        } catch (error) {
            console.error("Error toggling Follow:", error);
        }
    };

    const handleSave = () => {
        if (!isLogedin) {
            setShowLoginPrompt(true);
            return;
        }
        setShowPlaylistModal(true);
    };

    return (
        <div className="bg-[#1e1e1e] border border-gray-700 w-full text-white p-4 rounded-lg">
            <h1 className="text-lg sm:text-xl font-bold mb-2 break-words">{video?.title}</h1>

            <p className="text-gray-300 text-sm sm:text-base mb-2 w-full sm:w-3/4 break-words">
                {video?.description?.slice(0, maxLength) || "No Description"}
                {video?.description?.length > maxLength && !showFull && " ..."}
                {showFull && (
                    <span className="text-gray-500">{video?.description?.slice(maxLength)}</span>
                )}
            </p>

            <p className="text-gray-400 text-xs sm:text-sm mb-3">
                {video?.views} Views • {formatDistanceToNow(new Date(video?.createdAt))} ago
            </p>

            <div className="flex items-center gap-3 mb-4">
                <img
                    src={user?.data?.avatar || "https://via.placeholder.com/40"}
                    alt="Uploader"
                    className="w-10 h-10 rounded-full object-cover border border-gray-600"
                />
                <div>
                    <Link to={`/profile/${video?.uploader?.username}`}>
                        <p className="font-semibold text-sm sm:text-base hover:underline">
                            {video?.uploader?.username || "Unknown"}
                        </p>
                    </Link>
                    <p className="text-gray-400 text-xs">{followCount || 0} Followers</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center mb-4">
                <button
                    onClick={handleLikeToggle}
                    className={`px-4 py-2 rounded-lg flex items-center text-sm ${isLiked ? "bg-blue-600" : "bg-gray-800"
                        }`}
                >
                    <img src="/assets/icons/liked.png" alt="like" className="h-5 mr-2" />
                    {likesCount}
                </button>

                <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg bg-gray-800 flex items-center text-sm"
                >
                    <img src="/assets/icons/collection.png" alt="collection" className="h-5 mr-2" />
                    Save
                </button>

                {video?.uploader?._id !== userDetail?._id ? (
                    <button
                        onClick={handleFollowToggle}
                        className={`px-4 py-2 rounded-lg text-sm ${isFollowed ? "bg-gray-800" : "bg-purple-600"
                            }`}
                    >
                        {isFollowed ? "Unfollow" : "Follow"}
                    </button>
                ) : (
                    <button
                        onClick={handleProfile}
                        className="px-4 py-2 rounded-lg bg-purple-600 text-sm"
                    >
                        Watch your Profile
                    </button>
                )}
            </div>

            {video?.description?.length > maxLength && (
                <button
                    onClick={() => setShowFull(!showFull)}
                    className="text-sm text-blue-400 hover:underline mt-1"
                >
                    {showFull ? "Show Less" : "More"}
                </button>
            )}

            {showPlaylistModal && (
                <CreatePlayListCard
                    videoId={video._id}
                    userId={userId}
                    onClose={() => setShowPlaylistModal(false)}
                />
            )}

            {showLoginPrompt && <LoginPrompt onClose={() => setShowLoginPrompt(false)} />}
        </div>

    );
};

export default VideoDetails;
