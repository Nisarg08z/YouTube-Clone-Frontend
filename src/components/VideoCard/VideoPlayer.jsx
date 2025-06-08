import React, { useEffect, useRef, useState } from "react";
import { incrementVideoView } from "../../utils/api";

function VideoPlayer({ video }) {
  const videoRef = useRef(null);
  const [viewCounted, setViewCounted] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;

    if (!vid || !video?.videoFile) return;

    const handleAutoplay = async () => {
      try {
        await vid.play();
      } catch (err) {
        console.warn("Autoplay failed:", err);
      }
    };

    const handleMetadata = () => {
      handleAutoplay();
    };

    vid.addEventListener("loadedmetadata", handleMetadata);

    return () => {
      vid.removeEventListener("loadedmetadata", handleMetadata);
    };
  }, [video]);

  const handlePlay = () => {
    if (!viewCounted && video?._id) {
      incrementVideoView(video._id);
      setViewCounted(true);
    }
  };

  if (!video) return null;

  return (
    <div className="w-full">
      <video
        ref={videoRef}
        controls
        autoPlay
        onPlay={handlePlay}
        muted
        className="w-full rounded-lg shadow-lg max-h-[80vh] object-contain"
      >
        <source src={video.videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
