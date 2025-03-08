import React, { useContext, useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { removeVideoFromPlaylist } from "../../utils/api"

const VideoCard = ({ video, hideUploader = false, isHorizontal = false, playList = null }) => {
  const { userDetail } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
  
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container")) {
        setMenuOpen(false);
      }
    };
  
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);  

  const handleRemove = async () => {
    try {
      await removeVideoFromPlaylist(video._id, playList?._id);
      window.location.reload();
    } catch (error) {
      console.error("remove video",error)
    }
    setMenuOpen(false);
  };

  return (
    <Link to={`/video/${video._id}`} className="block">
      <div
        className={`bg-gray-800 rounded-lg overflow-visible shadow-lg 
        ${isHorizontal ? "flex flex-row w-full gap-x-3 items-center justify-between" : "w-72 flex flex-col"}`}
      >
        {/* Thumbnail Section */}
        <div className={`${isHorizontal ? "w-36 h-24" : "w-full h-40"} relative`}>
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover rounded-l-lg"
          />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
            {formatDuration(video.duration)}
          </span>
        </div>

        {/* Video Details */}
        <div className="p-3 flex items-start space-x-3 flex-1 relative overflow-visible">
          {!isHorizontal && !hideUploader && (
            <img
              src={video.uploader?.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          )}

          <div className="flex-1">
            <h3 className="text-white font-medium text-sm truncate">
              {truncateDescription(video.title)}
            </h3>

            {!hideUploader && (
              <Link
                to={`/profile/${video.uploader?.username}`}
                className="hover:text-gray-400 text-gray-300 text-sm"
              >
                {video.uploader?.fullName}
              </Link>
            )}

            <p className="text-gray-400 text-xs">
              {formatViews(video.views)} views • {formatCreatedAt(video.createdAt)}
            </p>
          </div>
        </div>

        {playList?.owner?.username === userDetail?.username && (
          <div className="relative menu-container p-3 overflow-visible">
            <button
              className="text-gray-400 hover:text-white p-1"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(!menuOpen);
              }}
            >
              ⋮
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-24 bg-gray-700 text-red-500 rounded shadow-lg py-1 z-50">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemove();
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-600"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

// Utility Functions
const formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const formatViews = (views) => {
  if (views >= 1e6) return `${(views / 1e6).toFixed(1)}M`;
  if (views >= 1e3) return `${(views / 1e3).toFixed(1)}K`;
  return views;
};

const formatCreatedAt = (createdAt) => {
  return formatDistanceToNow(new Date(createdAt)) + " ago";
};

const truncateDescription = (title = "") => {
  return title.length > 27 ? title.slice(0, 27) + "..." : title;
};

export default VideoCard;