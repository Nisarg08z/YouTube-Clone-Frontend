import { useEffect, useState } from "react";
import { SubscriberGrid } from "..";
import { getuserchannelsubscribers } from "../../utils/api";
import { EmptyFollowPage } from "..";

const FollowingList = ({ userId, isProfile }) => {
  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannelSubscribers = async () => {
      try {
        const data = await getuserchannelsubscribers(userId);
        setSubscribers(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelSubscribers();
  }, [userId]);

  const filteredSubscribers = Array.isArray(subscribers)
    ? subscribers.filter((subscriber) =>
        subscriber.subscriber?.username?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 mb-4 border border-gray-700 rounded bg-black text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="text-center text-white">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredSubscribers.length > 0 ? (
        <SubscriberGrid Subscribers={filteredSubscribers} isProfile={isProfile}/>
      ) : (
        <EmptyFollowPage />
      )}
    </div>
  );
};

export default FollowingList;
