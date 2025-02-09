import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVideoDetails, incrementVideoView } from "../../utils/api";
import { VideoDetails, CommentSection } from "../../components";
import { UserContext } from "../../contexts/UserContext";

const VideoPlayer = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLogedin, userDetail } = useContext(UserContext);
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (userDetail !== null) {
      setAuthChecked(true);
    }
  }, [userDetail]);

  useEffect(() => {
    if (authChecked && !isLogedin) {
      navigate("/login");
    }
  }, [authChecked, isLogedin, navigate]);

  useEffect(() => {
    if (!authChecked) return;

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
  }, [videoId, authChecked]);

  if (!authChecked) {
    return <div className="text-white text-center p-6">Checking authentication...</div>;
  }

  if (loading) {
    return <div className="text-white text-center p-6">Loading video...</div>;
  }

  return (
    <div className="min-h-screen p-2">
      <video controls onPlay={() => incrementVideoView(videoId)} className="w-full max-w-4xl rounded-lg shadow-lg">
        <source src={video.videoFile} type="video/mp4" />
      </video>

      <div className="pt-4">
        <VideoDetails video={video} />
      </div>

      <div className="pt-4">
        <CommentSection videoId={videoId} currentUser={userDetail?._id} videoOwner={video?.owner} />
      </div>
    </div>
  );
};

export default VideoPlayer;
