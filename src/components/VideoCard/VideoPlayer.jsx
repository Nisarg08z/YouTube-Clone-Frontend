import React, { useEffect, useRef, useState } from "react";
import { incrementVideoView } from "../../utils/api";

function VideoPlayer({ video }) {
    const videoRef = useRef(null);
    const [viewCounted, setViewCounted] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch((error) => {
                console.error("Autoplay failed:", error);
            });
        }
    }, [video]);

    const handlePlay = () => {
        if (!viewCounted) {
            incrementVideoView(video._id);
            setViewCounted(true);
        }
    };

    if (!video) return null;

    return (
        <div>
            <video
                ref={videoRef}
                controls
                autoPlay
                onPlay={handlePlay}
                className="w-full rounded-lg shadow-lg"
            >
                <source src={video.videoFile} type="video/mp4" />
            </video>
        </div>
    );
}

export default VideoPlayer;
