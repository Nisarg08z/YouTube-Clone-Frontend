import React from "react";
import { incrementVideoView } from "../../utils/api";

import { useEffect, useRef } from "react";

function VideoPlayer({ video }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [video]);

    if (!video) return null;

    return (
        <div>
            <video
                ref={videoRef}
                controls
                onPlay={() => incrementVideoView(video._id)}
                className="w-full rounded-lg shadow-lg"
            >
                <source src={video.videoFile} type="video/mp4" />
            </video>
        </div>
    );
}


export default VideoPlayer;
