import React, { useContext, useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { removeVideoFromPlaylist } from "../../utils/api";

const VideoCard = ({
  video,
  hideUploader = false,
  isHorizontal = false,
  playList = null,
}) => {
  const { userDetail, isLogedin } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  const handleRemove = async () => {
    try {
      await removeVideoFromPlaylist(video._id, playList?._id);
      window.location.reload();
    } catch (error) {
      console.error("remove video error:", error);
    }
    setMenuOpen(false);
  };

  return (
    <Link to={`/video/${video._id}`} className="block group">
      <div
        className={`${isHorizontal
            ? "flex flex-row w-full gap-4"
            : "flex flex-col w-full max-w-[320px]  mx-auto"

          } bg-[#1e1e1e] border border-gray-700 rounded-xl shadow-md overflow-hidden relative transition-shadow group-hover:shadow-lg`}
      >

        {/* Thumbnail */}
        <div
          className={`relative ${isHorizontal
              ? "w-48 h-32 sm:w-40 sm:h-28 md:w-44 md:h-30 lg:w-48 lg:h-32 flex-shrink-0"
              : "w-full aspect-video min-w-[220px] max-w-full"
            }`}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className={`w-full h-full object-cover ${isHorizontal ? "rounded-l-lg" : "rounded-t-xl"
              }`}
          />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
            {formatDuration(video.duration)}
          </span>
        </div>

        {/* Details */}
        <div className="p-3 flex items-start space-x-3 flex-1 min-w-0 overflow-hidden">
          {!isHorizontal && !hideUploader && (
            <img
              src={video.uploader?.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-sm truncate">{video.title}</h3>
            {!hideUploader && (
              <Link
                to={`/profile/${video.uploader?.username}`}
                className="hover:text-gray-400 text-gray-300 text-sm block truncate"
              >
                {video.uploader?.fullName}
              </Link>
            )}
            <p className="text-gray-400 text-xs truncate">
              {formatViews(video.views)} views • {formatCreatedAt(video.createdAt)}
            </p>
          </div>
        </div>

        {/* 3-dot Menu (only if owner) */}
        {playList?.owner?.username === userDetail?.username && isLogedin && (
          <div className="absolute top-2 right-2 menu-container z-50">
            <button
              className="text-gray-300 hover:text-white p-1 rounded hover:bg-gray-700 transition"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen((prev) => !prev);
              }}
              aria-label="Toggle menu"
            >
              ⋮
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-gray-800 text-red-500 rounded shadow-lg py-1">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemove();
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
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

export default VideoCard;
