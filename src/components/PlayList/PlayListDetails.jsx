import React, {useEffect,useState} from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const PlayListDetails = ({ playList }) => {
    //console.log("-------->", playList);
    const [unPublishedVideos, setunPublishedVideos] = useState([]);

  useEffect(() => {
    const updatePlaylistVideos = async () => {
      const validVideos = await Promise.all(
        playList.videos.map(async (video) => {

          if (!video.isPublished) return null;

          return video;
        })
      );

      setunPublishedVideos(validVideos.filter(Boolean)); 
    };

    updatePlaylistVideos(); 
  }, [playList.videos]);

    return (
        <div>
            <div className="relative">
                <img
                    src="https://res.cloudinary.com/dby0edrrn/image/upload/v1739551543/DALL_E_2025-02-14_22.11.14_-_A_simple_widescreen_video_thumbnail_representing_multiple_videos._The_design_features_a_large_play_button_in_the_center_with_a_minimalistic_dark_backg_yrnplv.webp"
                    alt="Playlist"
                    className="w-full h-auto rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <p className="text-gray-300 text-sm">Playlist</p>
                    <p className="text-white text-lg">
                        {playList?.createdAt ? formatCreatedAt(playList.createdAt) : "N/A"}
                    </p>
                    <p className="text-gray-300 text-sm">{unPublishedVideos.length} Videos</p>
                </div>
            </div>
            <p className="text-white text-xl font-semibold mt-4">
                {playList.name}
            </p>
            <p className="text-gray-400 text-sm">
                {playList.description}
            </p>
            <div className="flex items-center  mt-2">
                <Link to={`/profile/${playList?.owner?.username}`} className="flex gap-3" >
                    <img
                        src={playList?.owner?.avatar}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <p className="text-white font-semibold">{playList?.owner?.fullName}</p>
                        <p className="text-gray-400 text-sm">@{playList?.owner?.username}</p>
                    </div>
                </Link>
            </div>
        </div >
    );
};

const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    return isNaN(date) ? "Invalid Date" : formatDistanceToNow(date) + " ago";
};

export default PlayListDetails;
