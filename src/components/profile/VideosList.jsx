import React , {useEffect} from "react"
import { VideoGrid, EmptyState } from '../';
import { useVideoContext } from '../../contexts/VideoContext';

const VideosList = ({userId}) => {

  //console.log("----------------", userId)
  const { uservideos, loading, error , fetchUserVideos} = useVideoContext();

  console.log("--------------" , userId)

  useEffect(() => {
    if (userId) {
      fetchUserVideos(userId);
    }
  }, [userId]);

  return (
    <>
        <div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : uservideos.length > 0 ? (
        <VideoGrid videos={uservideos}  hideUploader={true}/>
      ) : (
        <EmptyState />
      )}
    </div>
    </>
  );
};

export default VideosList;
