import { useEffect, useState, useContext } from "react";
import { statsContent, videosContent } from "../../utils/api";
import { StatCard, VideoTableGrid, VideoUpload } from "../../components";
import { UserContext } from "../../contexts/UserContext";

const Content = () => {
  const [stats, setStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userDetail } = useContext(UserContext);

  useEffect(() => {
    if (!userDetail?._id) return;

    const fetchData = async () => {
      try {
        const [statsData, videosData] = await Promise.all([
          statsContent(userDetail._id),
          videosContent(userDetail._id),
        ]);
        setStats(statsData);
        setVideos(videosData);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userDetail?._id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-white text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#111] min-h-screen text-white">
      {/* Upload Section */}
      <VideoUpload userDetail={userDetail} />

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <StatCard title="Total Views" value={stats.totalViews} />
          <StatCard title="Total Followers" value={stats.totalSubscribers} />
          <StatCard title="Total Likes" value={stats.totalLikes} />
        </div>
      )}

      {/* Video Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Uploaded Videos</h2>
        <VideoTableGrid videos={videos} />
      </div>
    </div>
  );
};

export default Content;
