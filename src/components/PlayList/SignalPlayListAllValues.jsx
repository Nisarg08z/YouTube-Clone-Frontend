import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getPlaylistById,
  checkVideoExists,
  removeVideoFromPlaylist,
} from "../../utils/api";
import { VideoGrid } from "../VideoCard";
import PlayListDetails from "./PlayListDetails";

const SignalPlayListAllValues = () => {
  const { playlistId } = useParams();
  const [playListVideo, setPlayListVideo] = useState([]);
  const [playListDetails, setPlayListDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayList = async () => {
      try {
        const data = await getPlaylistById(playlistId);

        const validVideos = await Promise.all(
          data.videos.map(async (video) => {
            if (!video.isPublished) return null;

            const exists = await checkVideoExists(video._id);
            if (!exists) {
              await removeVideoFromPlaylist(video._id, playlistId);
              return null;
            }

            return video;
          })
        );

        setPlayListVideo(validVideos.filter(Boolean));
        setPlayListDetails(data);
      } catch (error) {
        console.error("Error fetching PlayList:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayList();
  }, [playlistId]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-lg">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen w-full px-4 py-6 max-w-7xl mx-auto flex flex-col gap-6 lg:flex-row lg:gap-10">
      {/* Playlist Details */}
      <div className="w-full lg:w-[40%]">
        <PlayListDetails playList={playListDetails} />
      </div>

      {/* Videos Section */}
      <div className="w-full lg:w-[60%]">
        <VideoGrid
          videos={playListVideo}
          hideUploader={false}
          isHorizontal={true}
          playList={playListDetails}
        />
      </div>
    </div>
  );
};

export default SignalPlayListAllValues;
