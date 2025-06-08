import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getVideoDetails, addToWatchHistory } from "../../utils/api";
import {
  VideoDetails,
  CommentSection,
  VideoGrid,
  VideoPlayer,
} from "../../components";
import { UserContext } from "../../contexts/UserContext";
import { useVideoContext } from "../../contexts/VideoContext";

const VideoPage = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  const { userDetail, isLogedin } = useContext(UserContext); 
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

  useEffect(() => {
    const addWatchHistory = async () => {
      if (!isLogedin) return; 

      try {
        await addToWatchHistory(videoId);
      } catch (error) {
        console.error("Error adding video to watch history:", error);
      }
    };

    addWatchHistory();
  }, [videoId, isLogedin]); 

  if (loading) return <p>Loading...</p>;
  if (!video) return <p>Video not found</p>;

  return (
    <div className="min-h-screen p-2 flex flex-col lg:flex-row gap-4">
      <div className="lg:w-[65%] w-full flex flex-col gap-4">
        <VideoPlayer video={video} />
        <VideoDetails video={video} userId={userDetail?._id} />
        <CommentSection
          videoId={videoId}
          currentUser={userDetail?._id}
          videoOwner={video?.owner}
        />
      </div>

      <div className="lg:w-[35%] w-full mb-7">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <VideoGrid
            videos={allvideos}
            hideUploader={false}
            isHorizontal={true}
          />
        )}
      </div>
    </div>
  );
};

export default VideoPage;
