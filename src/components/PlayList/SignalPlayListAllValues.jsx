import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { getPlaylistById } from '../../utils/api';
import { VideoGrid } from '../VideoCard';
import PlayListDetails from './PlayListDetails'

const SignalPlayListAllValues = () => {

    const { playlistId } = useParams();
    const [playListVideo, setPlayListVideo] = useState(null);
    const [playListDetails, setPlayListDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlayList = async () => {
          try {
            const data = await getPlaylistById(playlistId);
            //console.log(data)
            setPlayListVideo(data.videos);
            setPlayListDetails(data);
          } catch (error) {
            console.error("Error fetching PlayList:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchPlayList();
      }, [playlistId]);

    if (loading) return <p>Loading...</p>;
    if (!playListVideo) return <p>Video not found</p>;

    return (
        <div className='min-h-screen p-2 flex flex-col md:flex-row gap-4'>

            {/* Left Section - Main Video */}
            <div className="w-[50%]">
                < PlayListDetails playList={playListDetails} />
            </div>

            {/* Right Section - Playlist */}
            <div className="w-[50%] flex flex-col overflow-hidden">
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <VideoGrid videos={playListVideo} hideUploader={false} isHorizontal={true} />
                )}
            </div>

        </div>
    )
}

export default SignalPlayListAllValues