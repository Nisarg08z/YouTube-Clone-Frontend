import React, { useState, useRef, useEffect, useContext } from "react";
import { editPlayList, deletePlayList, checkVideoExists, removeVideoFromPlaylist, getVideoDetails } from "../../utils/api";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function PlayListCard({ playlist }) {
  const [menuOpen, setMenuOpen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(playlist?.name || "");
  const [description, setDescription] = useState(playlist?.description || "");
  const { userDetail } = useContext(UserContext);
  const [filteredVideos, setFilteredVideos] = useState(playlist?.videos || []);

  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  if (!playlist) return null;

  useEffect(() => {
    const updatePlaylistVideos = async () => {
      const validVideos = await Promise.all(
        playlist.videos.map(async (video) => {
          const exists = await checkVideoExists(video);
          if (!exists) {
            await removeVideoFromPlaylist(video, playlist._id);
            return null;
          }

          const details = await getVideoDetails(video);
          if (!details.isPublished) return null;

          return video;
        })
      );

      setFilteredVideos(validVideos.filter(Boolean));
    };

    updatePlaylistVideos();
  }, [playlist.videos]);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        menuButtonRef.current && !menuButtonRef.current.contains(event.target)
      ) {
        setMenuOpen(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(menuOpen ? null : playlist.id);
  };

  const handleEditPlaylist = () => {
    setIsEditing(true);
    setMenuOpen(null);
  };

  const handleSavePlaylist = async () => {
    setLoading(true);
    try {
      await editPlayList(playlist._id, { name, description });
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePlaylist = async () => {
    setLoading(true);
    try {
      await deletePlayList(playlist._id);
      setMenuOpen(null);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-full max-w-[18rem] flex flex-col">
        <Link to={`/playlist/${playlist._id}`} className="block">
          <div className="relative aspect-video">
            <img
              src="https://res.cloudinary.com/dby0edrrn/image/upload/v1739551543/DALL_E_2025-02-14_22.11.14_-_A_simple_widescreen_video_thumbnail_representing_multiple_videos._The_design_features_a_large_play_button_in_the_center_with_a_minimalistic_dark_backg_yrnplv.webp"
              alt="playlist cover"
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
              {filteredVideos.length} Videos
            </span>
          </div>
        </Link>

        <div className="p-3 flex justify-between items-center">
          <p className="text-white text-lg font-semibold">{playlist.name}</p>
          {userDetail._id === playlist.owner && (
            <button
              ref={menuButtonRef}
              className="text-white px-2 py-1 rounded hover:bg-gray-700 transition"
              onClick={handleMenuToggle}
            >
              ⋮
            </button>
          )}

          {menuOpen === playlist.id && (
            <div
              ref={menuRef}
              className="absolute bg-gray-800 text-white p-2 rounded shadow-lg z-50"
              style={{
                top: menuButtonRef.current?.getBoundingClientRect().bottom + window.scrollY,
                left: menuButtonRef.current?.getBoundingClientRect().left + window.scrollX,
              }}
            >
              <button
                onClick={handleEditPlaylist}
                className="block w-full text-left py-1 px-2 hover:bg-gray-700"
                disabled={loading}
              >
                {loading ? "Editing..." : "Edit"}
              </button>
              <button
                onClick={handleDeletePlaylist}
                className="block w-full text-left py-1 px-2 hover:bg-gray-700 text-red-500"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 p-5 rounded-lg w-96">
            <h2 className="text-white text-xl font-semibold mb-4">Edit Playlist</h2>
            <div className="mb-4">
              <img
                src="https://res.cloudinary.com/dby0edrrn/image/upload/v1739551543/DALL_E_2025-02-14_22.11.14_-_A_simple_widescreen_video_thumbnail_representing_multiple_videos._The_design_features_a_large_play_button_in_the_center_with_a_minimalistic_dark_backg_yrnplv.webp"
                alt="Playlist"
                className="w-full h-40 object-cover rounded"
              />
            </div>

            <label className="text-gray-400 text-sm">Title</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded mb-3"
            />

            <label className="text-gray-400 text-sm">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded mb-4"
              rows="3"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePlaylist}
                className="px-4 py-2 bg-blue-600 text-white rounded"
                disabled={!name.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PlayListCard;
