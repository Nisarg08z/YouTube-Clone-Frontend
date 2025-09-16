import React , {useEffect, useRef, useCallback} from 'react';
import { VideoGrid, EmptyHomePage } from '../../components';
import { VideoGridSkeleton } from '../../components/Loading';
import { useVideoContext } from '../../contexts/VideoContext';

const HomePage = () => {
  const { allvideos, loading, error , fetchAllVideos, loadMoreVideos, hasMore, isLoadingMore } = useVideoContext();
  const observerRef = useRef(null);

  useEffect(() => {
    fetchAllVideos();
  }, []);

  const lastItemRef = useCallback((node) => {
    if (loading || isLoadingMore) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreVideos();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [loading, isLoadingMore, hasMore, loadMoreVideos]);

  return (
    <div>
      {loading ? (
        <VideoGridSkeleton count={12} />
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : allvideos.length > 0 ? (
        <>
          <VideoGrid videos={allvideos} hideUploader={false} />
          <div ref={lastItemRef} className="h-12" />
          {isLoadingMore && (
            <div className="text-center text-gray-400 py-4">Loading more…</div>
          )}
          {!hasMore && (
            <div className="text-center text-gray-500 py-6">You have reached the end.</div>
          )}
        </>
      ) : (
        <EmptyHomePage />
      )}
    </div>
  );
};

export default HomePage;
