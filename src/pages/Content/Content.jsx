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
    return <div className="text-white text-center p-6">Loading...</div>;
  }

  return (
    <div className="p-6 bg-black text-white">

      <VideoUpload userDetail={userDetail} />
      
      {stats && (
        <div className="grid grid-cols-3 gap-4">
          <StatCard title="Total Views" value={stats.totalViews} />
          <StatCard title="Total Followers" value={stats.totalSubscribers} />
          <StatCard title="Total Likes" value={stats.totalLikes} />
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl mb-4">Uploaded Videos</h2>
        <VideoTableGrid videos={videos} />
      </div>
    </div>
  );
};

export default Content;
