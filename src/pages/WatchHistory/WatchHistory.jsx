import React, { useState, useEffect } from "react";
import { VideoGrid, EmptyHistoryPage } from "../../components";
import { VideoGridSkeleton } from "../../components/Loading";
import { getWatchedVideos } from "../../utils/api";

const WatchHistory = () => {

    const [WatchedVideos, setWatchedVideos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        

        const fetchWatchedVideos = async () => {
            try {
                const videos = await getWatchedVideos();
                setWatchedVideos(videos);
            } catch (err) {
                setError("Failed to load watched videos.");
                console.error(err);  
            } finally {
                setLoading(false);
            }
        };

        fetchWatchedVideos();
    }, []); 

    if (loading) return <VideoGridSkeleton />;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div>
            {WatchedVideos.length > 0 ? (
                <VideoGrid videos={WatchedVideos} hideUploader={false} />
            ) : (
                <EmptyHistoryPage />
            )}
        </div>
    );
};

export default WatchHistory;
