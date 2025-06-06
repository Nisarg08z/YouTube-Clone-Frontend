import React, { useState, useRef, useEffect, useContext } from "react";
import {
  editPlayList,
  deletePlayList,
  checkVideoExists,
  removeVideoFromPlaylist,
  getVideoDetails,
} from "../../utils/api";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const PlayListCard = ({ playlist }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(playlist?.name || "");
  const [description, setDescription] = useState(playlist?.description || "");
  const [filteredVideos, setFilteredVideos] = useState([]);
  const { userDetail } = useContext(UserContext);

  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchValidVideos = async () => {
      const valid = await Promise.all(
        playlist.videos.map(async (video) => {
          const exists = await checkVideoExists(video);
          if (!exists) {
            await removeVideoFromPlaylist(video, playlist._id);
            return null;
          }
          const details = await getVideoDetails(video);
          return details.isPublished ? video : null;
        })
      );
      setFilteredVideos(valid.filter(Boolean));
    };

    fetchValidVideos();
  }, [playlist.videos, playlist._id]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !menuButtonRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setMenuOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePlayList(playlist._id);
      window.location.reload();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await editPlayList(playlist._id, { name, description });
      setIsEditing(false);
      window.location.reload();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-md w-full max-w-sm mx-auto flex flex-col transition hover:shadow-lg">
        <Link to={`/playlist/${playlist._id}`}>
          <div className="relative aspect-video">
            <img
              src="https://res.cloudinary.com/dby0edrrn/image/upload/v1739551543/DALL_E_2025-02-14_22.11.14_-_A_simple_widescreen_video_thumbnail_representing_multiple_videos._The_design_features_a_large_play_button_in_the_center_with_a_minimalistic_dark_backg_yrnplv.webp"
              alt="Playlist cover"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
              {filteredVideos.length} Videos
            </span>
          </div>
        </Link>

        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-white font-semibold text-base truncate">{playlist.name}</h3>
          {userDetail?._id === playlist.owner && (
            <button
              ref={menuButtonRef}
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-gray-300"
            >
              ⋮
            </button>
          )}
        </div>

        {/* Menu Pop */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute z-50 mt-2 w-40 right-3 top-10 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl transition-all animate-fade-in"
          >
            <button
              onClick={handleEdit}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700 transition"
              disabled={loading}
            >
              {loading ? "Editing..." : "Edit Playlist"}
            </button>
            <button
              onClick={handleDelete}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-zinc-700 transition"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Playlist"}
            </button>
          </div>
        )}

      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-zinc-900 w-full max-w-md p-6 rounded-lg shadow-xl">
            <h2 className="text-white text-lg font-semibold mb-4">Edit Playlist</h2>
            <img
              src="https://res.cloudinary.com/dby0edrrn/image/upload/v1739551543/DALL_E_2025-02-14_22.11.14_-_A_simple_widescreen_video_thumbnail_representing_multiple_videos._The_design_features_a_large_play_button_in_the_center_with_a_minimalistic_dark_backg_yrnplv.webp"
              className="w-full h-40 object-cover rounded mb-4"
              alt="Playlist"
            />

            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mb-3 bg-zinc-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-zinc-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              rows="3"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!name.trim()}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayListCard;
