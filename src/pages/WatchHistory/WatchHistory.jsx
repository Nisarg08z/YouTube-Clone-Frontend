import React, { useState, useEffect } from "react";
import { VideoGrid, EmptyHomePage } from "../../components";
import { getWatchedVideos } from "../../utils/api";

const WatchHistory = () => {
    const [WatchedVideos, setWatchedVideos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLikedVideos = async () => {
            try {
                const videos = await getWatchedVideos();
                setWatchedVideos(videos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLikedVideos();
    }, []);

    console.log(WatchedVideos)

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return WatchedVideos.length > 0 ? (
        <VideoGrid videos={WatchedVideos} hideUploader={false} />
    ) : (
        <EmptyHomePage />
    );
};

export default WatchHistory;
