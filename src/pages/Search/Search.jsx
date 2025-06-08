import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getVideos } from "../../utils/api";
import { VideoGrid } from "../../components";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const allVideos = await getVideos();
        const filteredVideos = allVideos.filter((video) =>
          video.title.toLowerCase().includes(query.toLowerCase())
        );
        setVideos(filteredVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchVideos();
  }, [query]);

  return (
    <div className="p-4">
      <h2 className="text-white text-2xl font-bold mb-4">Search results for `{query}`</h2>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : videos.length === 0 ? (
        <p className="text-gray-400">No videos found.</p>
      ) : (
        <VideoGrid videos={videos} isHorizontal={true} />
      )}
    </div>
  );
};

export default Search;
