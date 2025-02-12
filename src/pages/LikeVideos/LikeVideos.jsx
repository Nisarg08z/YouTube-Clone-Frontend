import React, { useState, useEffect } from "react";
import { VideoGrid, EmptyHomePage } from "../../components";
import { getLikeVideos } from "../../utils/api";

const LikeVideos = () => {
    const [allLikeVideos, setAllLikeVideos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLikedVideos = async () => {
            try {
                const videos = await getLikeVideos();
                setAllLikeVideos(videos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchLikedVideos();
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return allLikeVideos.length > 0 ? (
        <VideoGrid videos={allLikeVideos} hideUploader={false} />
    ) : (
        <EmptyHomePage />
    );
};

export default LikeVideos;
