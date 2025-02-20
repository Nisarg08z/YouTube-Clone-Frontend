import { useEffect, useState, useContext } from "react";
import { addTweet, fetchTweets, updateTweet, deleteTweet } from "../../utils/api";
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

  const formatCreatedAt = (createdAt) => {
    return createdAt ? formatDistanceToNow(new Date(createdAt)) + " ago" : "N/A";
  };

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
    <div className="bg-black w-full text-white p-4 rounded-lg border border-gray-700">
      <h2>{tweets.length} Tweets</h2>
      {userId === userDetail?._id && (
        <div>
          <input
            type="text"
            className="w-full p-2 bg-gray-800 rounded"
            placeholder="What's on your mind?"
            value={newTweet}
            onChange={(e) => setNewTweet(e.target.value)}
          />
          <button
            onClick={handleAddOrUpdateTweet}
            className={`mt-2 px-4 py-2 rounded ${editingTweetId ? "bg-green-500" : "bg-blue-500"} text-white`}
          >
            {editingTweetId ? "Update" : "Tweet"}
          </button>
        </div>
      )}
      {tweets.map((tweet) => (
        <div key={tweet._id} className="border-b border-gray-700 p-4">
          <div className="flex items-start gap-3">
            {/* User Avatar */}
            <img
              src={tweet.owner?.avatar || "/default-avatar.png"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border border-gray-600"
            />

            {/* Tweet Content */}
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">
                    {tweet.owner?.fullName}
                    <span className="text-gray-400 text-xs sm:text-sm ml-2">
                      • {formatCreatedAt(tweet?.createdAt)}
                    </span>
                  </p>
                  <div className="text-xs text-gray-400">
                    @{tweet.owner?.username}
                  </div>
                </div>

                {/* Options Menu */}
                {userDetail._id === tweet.owner?._id && (
                  <div className="relative">
                    <button
                      onClick={() => setMenuOpen(menuOpen === tweet._id ? null : tweet._id)}
                      className="text-gray-400 hover:text-white p-1"
                    >
                      ⋮
                    </button>

                    {menuOpen === tweet._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-gray-800 text-white rounded shadow-lg z-10">
                        <button
                          onClick={() => handleEditTweet(tweet._id, tweet.content)}
                          className="block px-4 py-2 hover:bg-gray-700 w-full text-left"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTweet(tweet._id)}
                          className="block px-4 py-2 hover:bg-gray-700 w-full text-left text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Tweet Text */}
              <p className="text-gray-300 text-sm mt-2">{tweet.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TweetsList;
