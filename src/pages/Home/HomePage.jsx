import React , {useEffect} from 'react';
import { VideoGrid, EmptyState } from '../../components';
import { useVideoContext } from '../../contexts/VideoContext';

const HomePage = () => {
  const { allvideos, loading, error , fetchAllVideos} = useVideoContext();

  useEffect(() => {
    fetchAllVideos();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : allvideos.length > 0 ? (
        <VideoGrid videos={allvideos} hideUploader={false} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default HomePage;
