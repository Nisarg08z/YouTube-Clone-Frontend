import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { getUserProfile, toggleVideoLike, isVideosLikeByUser, getUserPlaylists, createPlaylist, saveVideoToPlaylist } from "../../utils/api";
import { Link } from "react-router-dom";
import { CreatePlayListCard } from "../PlayList"

const VideoDetails = ({ video, userId }) => {
    const [showFull, setShowFull] = useState(false);
    const [user, setUser] = useState(null);
    const maxLength = 70;
    const [isLiked, setIsLiked] = useState(null);
    const [likesCount, setLikesCount] = useState(video?.likesCount);
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);

    //console.log("user --- ",userId)

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

    const handleLikeToggle = async () => {
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

    return (
        <div className="bg-black w-full text-white p-4 rounded-lg border border-gray-700 relative transition-all duration-300">
            <p className="text-lg font-bold break-words h-auto w-[75%]">
                {video?.description?.slice(0, maxLength) || "No Description"}
                {video?.description?.length > maxLength && !showFull && " ..."}
                {showFull && video?.description?.length > maxLength && (
                    <span className="text-gray-300">{video?.description?.slice(maxLength)}</span>
                )}
            </p>
            <p className="text-gray-400 text-sm">
                {video?.views} Views • {formatDistanceToNow(new Date(video?.createdAt))} ago
            </p>

            <Link to={`/profile/${video?.uploader?.username}`}>
                <div className="flex items-center mt-3">
                    <img src={user?.data?.avatar || "https://via.placeholder.com/40"} alt="User" className="w-10 h-10 rounded-full" />
                    <div className="ml-3">
                        <p className="font-bold">{video?.uploader?.username || "Unknown"}</p>
                        <p className="text-gray-400 text-sm">{user?.data?.subscribersCount || 0} Followers</p>
                    </div>
                </div>
            </Link>

            <div className="absolute top-4 right-4 flex flex-col items-end space-y-2">
                <div className="flex space-x-2 pb-2">
                    <button onClick={handleLikeToggle} className={`px-4 py-1 rounded-lg text-white flex items-center ${isLiked ? "bg-blue-600" : "bg-gray-800"}`}>
                        <img src={"/assets/icons/liked.png"} alt="like" className="h-6" />
                        <span className="ml-2">{likesCount}</span>
                    </button>

                    <button onClick={() => setShowPlaylistModal(true)} className="bg-gray-800 px-4 py-2 rounded-lg text-white flex items-center">
                        <img src="/assets/icons/collection.png" alt="collection" className="h-6" />
                        <span className="ml-2">Save</span>
                    </button>
                </div>

                <button className="bg-purple-600 px-4 py-1 rounded-lg">Follow</button>

                {video?.description?.length > maxLength && (
                    <button onClick={() => setShowFull(!showFull)} className="text-white mt-2 flex bottom-3">
                        {showFull ? "Show Less" : "More"}
                    </button>
                )}
            </div>

            {showPlaylistModal && (
                <CreatePlayListCard videoId={video._id} userId={userId} onClose={() => setShowPlaylistModal(false)} />
            )}
        </div>
    );
};

export default VideoDetails;
