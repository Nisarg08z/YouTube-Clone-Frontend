import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getVideoDetails, incrementVideoView } from "../../utils/api";
import { VideoDetails, CommentSection, VideoGrid } from "../../components";
import { UserContext } from "../../contexts/UserContext";
import { useVideoContext } from '../../contexts/VideoContext';


const VideoPlayer = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const { userDetail } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const { allvideos, error, fetchAllVideos } = useVideoContext();

  useEffect(() => {
    fetchAllVideos();
  }, []);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await getVideoDetails(videoId);
        setVideo(data);
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (loading) return <p>Loading...</p>;
  if (!video) return <p>Video not found</p>;

  return (
    <div className="min-h-screen p-2 flex flex-col md:flex-row gap-4">
      {/* Left Section - Video Player */}
      <div className="w-[65%]">
        <video
          controls
          onPlay={() => incrementVideoView(videoId)}
          className="w-full rounded-lg shadow-lg"
        >
          <source src={video.videoFile} type="video/mp4" />
        </video>
  
        <div className="pt-4">
          <VideoDetails video={video} />
        </div>
  
        <div className="pt-4">
          <CommentSection videoId={videoId} currentUser={userDetail?._id} videoOwner={video?.owner} />
        </div>
      </div>
  
      {/* Right Section - Extend VideoGrid Fully */}
      <div className="w-[35%] flex flex-col overflow-hidden">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <VideoGrid videos={allvideos} hideUploader={false} isHorizontal={true} />
        )}
      </div>
    </div>
  );
  
}

export default VideoPlayer;
