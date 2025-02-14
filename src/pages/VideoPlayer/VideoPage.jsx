import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getVideoDetails , addToWatchHistory} from "../../utils/api";
import { VideoDetails, CommentSection, VideoGrid, VideoPlayer } from "../../components";
import { UserContext } from "../../contexts/UserContext";
import { useVideoContext } from '../../contexts/VideoContext';


const VideoPage = () => {
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

  useEffect(() => {
    //console.log(videoId)
  
    const addWatchHistory = async () => {
      try {
        await addToWatchHistory(videoId);
      } catch (error) {
        console.error("Error adding video to watch history:", error);
      }
    };
  
    addWatchHistory();
  }, [videoId]);

  //console.log("video" , video)

  if (loading) return <p>Loading...</p>;
  if (!video) return <p>Video not found</p>;

  return (
    <div className="min-h-screen p-2 flex flex-col md:flex-row gap-4">
      {/* Left Section - Video Player */}
      <div className="w-[65%]">

        <div>
          <VideoPlayer video={video} />
        </div>

        <div className="pt-4">
          <VideoDetails video={video} userId={userDetail?._id}/>
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

export default VideoPage;
