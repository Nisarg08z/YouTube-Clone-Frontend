import React, { useState, useEffect, useContext } from "react";
import { VideoGrid, EmptyHistoryPage } from "../../components";
import { getWatchedVideos } from "../../utils/api";
import { UserContext } from "../../contexts/UserContext";  
import { useNavigate } from "react-router-dom";  

const WatchHistory = () => {
    const { isLogedin } = useContext(UserContext);  
    const navigate = useNavigate();  
    const [WatchedVideos, setWatchedVideos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        if (!isLogedin) {
            navigate("/login");
            return;
        }

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
    }, [isLogedin, navigate]); 

    if (loading) return <div className="text-center">Loading watched videos...</div>;
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
