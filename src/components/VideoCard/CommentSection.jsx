import { useEffect, useState } from "react";
import { addComment, fetchComments, updateComment, deleteComment } from "../../utils/api";

const CommentSection = ({ videoId, currentUser, videoOwner }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [totalComments, setTotalComments] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

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

  // Sorting logic: Logged-in user's comments first, then video owner's, then others (by newest)
  const sortComments = (comments) => {
    return comments.sort((a, b) => {
      if (a.owner?._id === currentUser && b.owner?._id !== currentUser) return -1;
      if (b.owner?._id === currentUser && a.owner?._id !== currentUser) return 1;
      if (a.owner?._id === videoOwner && b.owner?._id !== videoOwner) return -1;
      if (b.owner?._id === videoOwner && a.owner?._id !== videoOwner) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const handleAddOrUpdateComment = async () => {
    if (!newComment.trim()) return;

    if (editingCommentId) {
      try {
        await updateComment(editingCommentId, newComment);
        setEditingCommentId(null);
        setNewComment("");
      } catch (error) {
        console.error("Failed to update comment:", error);
      }
    } else {
      try {
        await addComment(videoId, newComment);
        setNewComment("");
      } catch (error) {
        console.error("Failed to add comment:", error);
      }
    }

    // Fetch updated comments after adding or updating
    fetchUpdatedComments();
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
      const updatedTotal = totalComments - 1;

      if (updatedTotal <= limit) {
        setPage(1);
      }

      fetchUpdatedComments();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };


  return (
    <div className="bg-black max-w-4xl text-white p-4 rounded-lg border border-gray-700">
      <h2>{totalComments} Comments</h2>
      <input
        type="text"
        className="w-full p-2 bg-gray-800 rounded"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        onClick={handleAddOrUpdateComment}
        className={`mt-2 px-4 py-2 rounded ${editingCommentId ? "bg-green-500" : "bg-blue-500"} text-white`}
      >
        {editingCommentId ? "Update" : "Comment"}
      </button>

      {comments.map((comment) => (
        <div key={comment._id} className="border-b border-gray-600 p-2 relative">
          <div className="flex justify-between items-center">
            <span>
              <b>{comment.owner?.email || "Unknown"}</b> • {new Date(comment.createdAt).toLocaleTimeString()}
            </span>
            {(currentUser === comment.owner?._id || videoOwner === currentUser) && (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(menuOpen === comment._id ? null : comment._id)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  ⋮
                </button>

                {menuOpen === comment._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-gray-800 text-white rounded shadow-lg z-10">
                    {currentUser === comment.owner?._id && (
                      <button
                        onClick={() => handleEditComment(comment._id, comment.content)}
                        className="block px-4 py-2 hover:bg-gray-700 w-full text-left"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="block px-4 py-2 hover:bg-gray-700 w-full text-left text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
          <p>{comment.content}</p>
        </div>
      ))}

      {comments.length < totalComments && (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="mt-2 px-4 py-2 bg-gray-700 text-white rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Show More"}
        </button>
      )}
    </div>
  );
};

export default CommentSection;
