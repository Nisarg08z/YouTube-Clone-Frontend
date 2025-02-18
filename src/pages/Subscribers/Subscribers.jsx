import { useEffect, useState } from "react";
import { getSubscribedChannels } from "../../utils/api";
import { EmptyFollowPage, SubscriberGrid } from "../../components"

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

  //console.log(channels)

  const filteredChannels = Array.isArray(channels)
    ? channels.filter((channel) =>
        channel.channel?.username?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

    //console.log(filteredChannels)

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
      ) : filteredChannels.length > 0 ? (
        <SubscriberGrid Subscribers={filteredChannels} />
      ) : (
        <EmptyFollowPage />
      )}
    </div>
  );
};

export default Subscribers;
