import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const PlayListDetails = ({ playList }) => {
  const [publishedVideos, setPublishedVideos] = useState([]);

  useEffect(() => {
    const updatePlaylistVideos = async () => {
      const validVideos = await Promise.all(
        playList.videos.map((video) => (video.isPublished ? video : null))
      );
      setPublishedVideos(validVideos.filter(Boolean));
    };

    updatePlaylistVideos();
  }, [playList.videos]);

  return (
    <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-md">
      <div className="relative">
        <img
          src="https://res.cloudinary.com/dby0edrrn/image/upload/v1739551543/DALL_E_2025-02-14_22.11.14_-_A_simple_widescreen_video_thumbnail_representing_multiple_videos._The_design_features_a_large_play_button_in_the_center_with_a_minimalistic_dark_backg_yrnplv.webp"
          alt="Playlist"
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4">
          <p className="text-white font-semibold text-lg">{playList.name}</p>
          <p className="text-gray-300 text-sm">
            {formatCreatedAt(playList.createdAt)} · {publishedVideos.length} Videos
          </p>
        </div>
      </div>

      <div className="p-4">
        <p className="text-gray-300 text-sm mb-2">{playList.description}</p>

        <Link
          to={`/profile/${playList?.owner?.username}`}
          className="flex items-center gap-3 mt-4 hover:bg-[#2a2a2a] p-2 rounded transition-all"
        >
          <img
            src={playList?.owner?.avatar}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="text-white font-semibold">{playList?.owner?.fullName}</p>
            <p className="text-gray-400 text-sm">@{playList?.owner?.username}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  return isNaN(date) ? "Invalid Date" : `${formatDistanceToNow(date)} ago`;
};

export default PlayListDetails;
