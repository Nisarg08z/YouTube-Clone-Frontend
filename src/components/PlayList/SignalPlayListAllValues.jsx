import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPlaylistById, checkVideoExists, removeVideoFromPlaylist } from "../../utils/api";
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

        // Filter videos: Only keep published & existing ones
        const validVideos = await Promise.all(
          data.videos.map(async (video) => {
            if (!video.isPublished) return null; // Skip unpublished videos

            const exists = await checkVideoExists(video._id);
            if (!exists) {
              await removeVideoFromPlaylist(video._id, playlistId); // Remove from playlist
              return null;
            }

            return video;
          })
        );

        setPlayListVideo(validVideos.filter(Boolean)); // Remove null values
        setPlayListDetails(data);
      } catch (error) {
        console.error("Error fetching PlayList:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayList();
  }, [playlistId]);

  if (loading) return <p>Loading...</p>;
  if (!playListVideo.length) return <p>No videos available</p>;

  return (
    <div className="min-h-screen p-2 flex flex-col md:flex-row gap-4">
      {/* Left Section - Playlist Details */}
      <div className="w-[50%]">
        <PlayListDetails playList={playListDetails} />
      </div>

      {/* Right Section - Playlist Videos */}
      <div className="w-[50%] flex flex-col overflow-hidden">
        <VideoGrid videos={playListVideo} hideUploader={false} isHorizontal={true} />
      </div>
    </div>
  );
};

export default SignalPlayListAllValues;
