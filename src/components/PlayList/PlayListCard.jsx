import React, { useState, useRef, useEffect } from "react";
import { editPlayList, deletePlayList } from "../../utils/api";

function PlayListCard({ playlist }) {
  const [menuOpen, setMenuOpen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(playlist?.name || "");
  const [description, setDescription] = useState(playlist?.description || "");
  
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  if (!playlist) return null;

  // Toggle the visibility of the menu
  const handleMenuToggle = () => {
    setMenuOpen(menuOpen ? null : playlist.id);
  };

  // Open the edit modal
  const handleEditPlaylist = () => {
    setIsEditing(true);
    setMenuOpen(null);
  };

  // Handle saving the playlist edit
  const handleSavePlaylist = async () => {
    setLoading(true);
    try {
      const updatedData = { name, description };
await editPlayList(playlist._id, updatedData);
      setIsEditing(false); 
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting the playlist instantly
  const handleDeletePlaylist = async () => {
    setLoading(true);
    try {
      await deletePlayList(playlist._id); // Delete the playlist from the API
      setMenuOpen(null); // Close the menu after deletion
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Close the menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setMenuOpen(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg w-full max-w-[18rem] flex flex-col">
        {/* Playlist Image and Video Count */}
        <div className="relative aspect-video">
          <img
            src="https://res.cloudinary.com/dby0edrrn/image/upload/v1739551543/DALL_E_2025-02-14_22.11.14_-_A_simple_widescreen_video_thumbnail_representing_multiple_videos._The_design_features_a_large_play_button_in_the_center_with_a_minimalistic_dark_backg_yrnplv.webp"
            alt="playlist cover"
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
            {playlist?.videos?.length || 0} Videos
          </span>
        </div>

        {/* Playlist Name and Menu Button */}
        <div className="p-3 flex justify-between items-center">
          <p className="text-white text-lg font-semibold">{playlist.name}</p>
          <button
            ref={menuButtonRef}
            className="text-white px-2 py-1 rounded hover:bg-gray-700 transition"
            onClick={handleMenuToggle}
          >
            ⋮
          </button>

          {/* Dropdown Menu */}
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

      {/* Edit Playlist Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 p-5 rounded-lg w-96">
            <h2 className="text-white text-xl font-semibold mb-4">Edit Playlist</h2>

            {/* Image Preview */}
            <div className="mb-4">
              <img
                src="https://res.cloudinary.com/dby0edrrn/image/upload/v1739551543/DALL_E_2025-02-14_22.11.14_-_A_simple_widescreen_video_thumbnail_representing_multiple_videos._The_design_features_a_large_play_button_in_the_center_with_a_minimalistic_dark_backg_yrnplv.webp"
                alt="Playlist"
                className="w-full h-40 object-cover rounded"
              />
            </div>

            {/* Playlist Name */}
            <label className="text-gray-400 text-sm">Title</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded mb-3"
            />

            {/* Playlist Description */}
            <label className="text-gray-400 text-sm">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-gray-800 text-white rounded mb-4"
              rows="3"
            />

            {/* Buttons */}
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
