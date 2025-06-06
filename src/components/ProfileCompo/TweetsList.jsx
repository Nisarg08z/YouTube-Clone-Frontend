import { useEffect, useState, useContext } from "react";
import {
  addTweet,
  fetchTweets,
  updateTweet,
  deleteTweet,
} from "../../utils/api";
import { formatDistanceToNow } from "date-fns";
import { UserContext } from "../../contexts/UserContext";

const TweetsList = ({ userId }) => {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [editingTweetId, setEditingTweetId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const { userDetail } = useContext(UserContext);

  useEffect(() => {
    const loadTweets = async () => {
      setLoading(true);
      try {
        const userTweets = await fetchTweets(userId);
        setTweets(userTweets);
      } catch (error) {
        console.error("Failed to load tweets:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTweets();
  }, [userId]);

  const formatCreatedAt = (createdAt) =>
    createdAt ? formatDistanceToNow(new Date(createdAt)) + " ago" : "N/A";

  const handleAddOrUpdateTweet = async () => {
    if (!newTweet.trim() || !userDetail?._id) return;

    try {
      if (editingTweetId) {
        await updateTweet(editingTweetId, newTweet);
        setEditingTweetId(null);
      } else {
        await addTweet(newTweet);
      }
      setNewTweet("");
      fetchUpdatedTweets();
    } catch (error) {
      console.error("Failed to save tweet:", error);
    }
  };

  const fetchUpdatedTweets = async () => {
    try {
      const userTweets = await fetchTweets(userId);
      setTweets(userTweets);
    } catch (error) {
      console.error("Failed to fetch updated tweets:", error);
    }
  };

  const handleEditTweet = (tweetId, content) => {
    setEditingTweetId(tweetId);
    setNewTweet(content);
    setMenuOpen(null);
  };

  const handleDeleteTweet = async (tweetId) => {
    try {
      await deleteTweet(tweetId);
      fetchUpdatedTweets();
    } catch (error) {
      console.error("Failed to delete tweet:", error);
    }
  };

  return (
    <div className="bg-[#1e1e1e] w-full mx-auto text-white p-4 rounded-lg border border-gray-700">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{tweets.length} Tweets</h2>
      </div>

      {/* Tweet input */}
      {userId === userDetail?._id && (
        <div className="mb-6">
          <textarea
            rows={3}
            maxLength={280}
            placeholder="What's on your mind?"
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
          <button
            onClick={handleAddOrUpdateTweet}
            className={`mt-2 px-5 py-2 text-sm rounded-md transition ${
              editingTweetId
                ? "bg-green-600 hover:bg-green-700"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {editingTweetId ? "Update" : "Tweet"}
          </button>
        </div>
      )}

      {/* Tweets */}
      {loading ? (
        <p className="text-gray-400">Loading tweets...</p>
      ) : tweets.length === 0 ? (
        <p className="text-gray-500 italic">No tweets yet.</p>
      ) : (
        tweets.map((tweet) => (
          <div
            key={tweet._id}
            className="border-b border-gray-800 py-4 animate-fadeIn"
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <img
                src={tweet.owner?.avatar || "/default-avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-gray-600"
              />

              {/* Tweet Body */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sm sm:text-base">
                      {tweet.owner?.fullName}
                      <span className="text-xs text-gray-400 ml-2">
                        • {formatCreatedAt(tweet?.createdAt)}
                      </span>
                    </p>
                    <p className="text-sm text-gray-400">
                      @{tweet.owner?.username}
                    </p>
                  </div>

                  {/* Menu */}
                  {userDetail._id === tweet.owner?._id && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setMenuOpen(menuOpen === tweet._id ? null : tweet._id)
                        }
                        className="text-gray-400 hover:text-white"
                      >
                        ⋮
                      </button>

                      {menuOpen === tweet._id && (
                        <div className="absolute right-0 mt-2 w-32 bg-gray-800 text-white rounded shadow-lg z-10">
                          <button
                            onClick={() =>
                              handleEditTweet(tweet._id, tweet.content)
                            }
                            className="block w-full px-4 py-2 text-left hover:bg-gray-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTweet(tweet._id)}
                            className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-700"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Tweet content */}
                <p className="mt-2 text-sm text-gray-300 whitespace-pre-wrap">
                  {tweet.content}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TweetsList;
