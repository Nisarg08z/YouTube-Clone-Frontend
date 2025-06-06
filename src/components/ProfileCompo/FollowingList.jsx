import { useEffect, useState } from "react";
import { SubscriberGrid, EmptyFollowPage } from "..";
import { getuserchannelsubscribers } from "../../utils/api";

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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search followers..."
          className="w-full p-3 rounded-lg bg-[#1e1e1e] text-white border border-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition duration-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* State Handling */}
      {loading ? (
        <p className="text-center text-gray-400 animate-pulse">Loading followers...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredSubscribers.length > 0 ? (
        <div className="animate-fadeIn">
          <SubscriberGrid Subscribers={filteredSubscribers} isProfile={isProfile} />
        </div>
      ) : (
        <EmptyFollowPage />
      )}
    </div>
  );
};

export default FollowingList;
