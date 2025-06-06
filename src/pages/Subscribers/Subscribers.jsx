import { useEffect, useState } from "react";
import { getSubscribedChannels } from "../../utils/api";
import { EmptyFollowPage, SubscriberGrid } from "../../components";

const Subscribers = () => {
  const [channels, setChannels] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const data = await getSubscribedChannels();
        setChannels(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  const filteredChannels = Array.isArray(channels)
    ? channels.filter((channel) =>
        channel.channel?.username
          ?.toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl font-bold text-white mb-4">Subscribers</h2>

      <input
        type="text"
        placeholder="Search by name..."
        className="w-full p-3 mb-6 rounded-md bg-[#2c2c2c] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p className="text-center text-white">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredChannels.length > 0 ? (
        <SubscriberGrid Subscribers={filteredChannels} />
      ) : (
        <EmptyFollowPage />
      )}
    </div>
  );
};

export default Subscribers;
