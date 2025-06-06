import { useEffect, useState, useContext } from "react";
import { addComment, fetchComments, updateComment, deleteComment } from "../../utils/api";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { UserContext } from "../../contexts/UserContext";
import LoginPrompt from "../LoginPrompt";

const CommentSection = ({ videoId, currentUser, videoOwner }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [totalComments, setTotalComments] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const { isLogedin } = useContext(UserContext);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      try {
        const { comments: newComments, totalComments } = await fetchComments(videoId, page, limit);
        setTotalComments(totalComments);

        setComments((prev) => {
          if (page === 1) return sortComments(newComments);
          const uniqueComments = new Map([...prev, ...newComments].map((c) => [c._id, c]));
          return sortComments(Array.from(uniqueComments.values()));
        });
      } catch (error) {
        console.error("Failed to load comments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [videoId, page]);

  const sortComments = (comments) => {
    return comments.sort((a, b) => {
      if (a.owner?._id === currentUser && b.owner?._id !== currentUser) return -1;
      if (b.owner?._id === currentUser && a.owner?._id !== currentUser) return 1;
      if (a.owner?._id === videoOwner && b.owner?._id !== videoOwner) return -1;
      if (b.owner?._id === videoOwner && a.owner?._id !== videoOwner) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const formatCreatedAt = (createdAt) => {
    return createdAt ? formatDistanceToNow(new Date(createdAt)) + " ago" : "N/A";
  };

  const handleAddOrUpdateComment = async () => {
    if (!isLogedin) {
      setShowLoginPrompt(true);
      return;
    }

    if (!newComment.trim()) return;

    try {
      if (editingCommentId) {
        await updateComment(editingCommentId, newComment);
        setEditingCommentId(null);
      } else {
        await addComment(videoId, newComment);
      }
      setNewComment("");
      fetchUpdatedComments();
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  const fetchUpdatedComments = async () => {
    try {
      const { comments: updatedComments, totalComments } = await fetchComments(videoId, 1, limit);
      setComments(sortComments(updatedComments));
      setTotalComments(totalComments);
    } catch (error) {
      console.error("Failed to fetch updated comments:", error);
    }
  };

  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setNewComment(content);
    setMenuOpen(null);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setPage(1);
      fetchUpdatedComments();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div className="w-full bg-[#1e1e1e] border border-gray-700 text-white p-4 rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-3">{totalComments} Comments</h2>

      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <input
          type="text"
          className="flex-1 w-full sm:w-auto p-2 bg-[#2c2c2c] border border-gray-600 rounded text-sm sm:text-base focus:ring-2 focus:ring-purple-500 transition"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddOrUpdateComment}
          className={`px-4 py-2 rounded text-sm sm:text-base ${editingCommentId ? "bg-green-500" : "bg-blue-500"} text-white`}
        >
          {editingCommentId ? "Update" : "Comment"}
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="border-b border-gray-700 pb-4">
            <div className="flex items-start gap-3">
              <img
                src={comment.owner?.avatar || "/default-avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border border-gray-600"
              />

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm sm:text-base">
                      {comment.owner?.fullName}
                      <span className="text-gray-400 ml-2 text-xs sm:text-sm">
                        • {formatCreatedAt(comment?.createdAt)}
                      </span>
                    </p>
                    <Link
                      to={`/profile/${comment.owner?.username}`}
                      className="text-xs hover:text-gray-400 block"
                    >
                      @{comment.owner?.username}
                    </Link>
                  </div>

                  {(currentUser === comment.owner?._id || videoOwner === currentUser) && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setMenuOpen(menuOpen === comment._id ? null : comment._id)
                        }
                        className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition"
                      >
                        <span className="text-xl">⋮</span>
                      </button>

                      {menuOpen === comment._id && (
                        <div className="absolute right-0 top-8 w-36 bg-[#2d2d2d] rounded-lg shadow-xl z-20 animate-fadeIn">
                          {currentUser === comment.owner?._id && (
                            <button
                              onClick={() =>
                                handleEditComment(comment._id, comment.content)
                              }
                              className="w-full px-4 py-2 text-left hover:bg-gray-700 text-sm"
                            >
                              ✏️ Edit
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="w-full px-4 py-2 text-left hover:bg-gray-700 text-sm text-red-500"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <p className="text-gray-300 text-sm mt-2">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {comments.length < totalComments && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
            disabled={loading}
          >
            {loading ? "Loading..." : "Show More"}
          </button>
        </div>
      )}

      {showLoginPrompt && <LoginPrompt onClose={() => setShowLoginPrompt(false)} />}
    </div>
  );
};

export default CommentSection;
