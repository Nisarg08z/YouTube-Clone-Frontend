import React, { useState, useEffect, useContext } from "react";
import { VideoGrid, EmptyLikePage } from "../../components";
import { getLikeVideos } from "../../utils/api";
import { UserContext } from "../../contexts/UserContext";  
import { useNavigate } from "react-router-dom"; 

const LikeVideos = () => {
    const { isLogedin } = useContext(UserContext); 
    const navigate = useNavigate(); 
    const [allLikeVideos, setAllLikeVideos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLogedin) {
            navigate("/login");
            return;
        }

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
    }, [isLogedin, navigate]); 

    if (loading) return <div className="text-center">Loading liked videos...</div>;
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
