import React, { useState, useEffect } from "react";
import { VideoGrid, EmptyLikePage } from "../../components";
import { VideoGridSkeleton } from "../../components/Loading";
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
                setError("Failed to load liked videos.");
                console.error(err); 
            } finally {
                setLoading(false);
            }
        };

        fetchLikedVideos();
    }, []); 

    if (loading) return <VideoGridSkeleton />;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div>
            {allLikeVideos.length > 0 ? (
                <VideoGrid videos={allLikeVideos} hideUploader={false} />
            ) : (
                <EmptyLikePage />
            )}
        </div>
    );
};

export default LikeVideos;
