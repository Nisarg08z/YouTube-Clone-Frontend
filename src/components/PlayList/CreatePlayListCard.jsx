import React, { useState, useEffect } from "react";
import {
  getUserPlaylists,
  createPlaylist,
  saveVideoToPlaylist,
} from "../../utils/api";
import { IoMdClose } from "react-icons/io";

const CreatePlayListCard = ({ videoId, userId, onClose }) => {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylist, setNewPlaylist] = useState({ name: "", description: "" });
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const userPlaylists = await getUserPlaylists(userId);
        setPlaylists(userPlaylists);
        if (userPlaylists.length === 0) setIsCreating(true);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, [userId]);

  const handleCreatePlaylist = async () => {
    if (!newPlaylist.name.trim()) return;
    try {
      const newPlaylistData = await createPlaylist(
        newPlaylist.name,
        newPlaylist.description
      );
      setPlaylists((prev) => [...prev, newPlaylistData]);
      setNewPlaylist({ name: "", description: "" });
      setIsCreating(false);
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const handleSaveToPlaylists = async () => {
    for (let playlistId of selectedPlaylists) {
      try {
        await saveVideoToPlaylist(playlistId, videoId);
      } catch (error) {
        console.error("Error saving video to playlist:", error);
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative bg-[#1e1e1e] border border-gray-700 rounded-xl shadow-2xl w-full max-w-md p-6 text-gray-900 dark:text-white max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition text-xl"
        >
          <IoMdClose />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Save to Playlist</h2>

        {/* Playlist Selection */}
        {!isCreating && playlists.length > 0 ? (
          <div className="space-y-2 mb-5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {playlists.map((playlist) => (
              <label
                key={playlist._id}
                className="flex items-center justify-between bg-[#2c2c2c] border border-gray-600 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <span className="truncate">{playlist.name}</span>
                <input
                  type="checkbox"
                  className="accent-purple-600 scale-125 ml-3"
                  checked={selectedPlaylists.includes(playlist._id)}
                  onChange={(e) =>
                    setSelectedPlaylists((prev) =>
                      e.target.checked
                        ? [...prev, playlist._id]
                        : prev.filter((id) => id !== playlist._id)
                    )
                  }
                />
              </label>
            ))}
          </div>
        ) : (
          // Create Playlist Form
          <div className="space-y-3 mb-4">
            <input
              type="text"
              placeholder="Playlist name"
              className="w-full p-3 rounded-lg bg-[#2c2c2c] border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={newPlaylist.name}
              onChange={(e) =>
                setNewPlaylist({ ...newPlaylist, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full p-3 rounded-lg bg-[#2c2c2c] border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={newPlaylist.description}
              onChange={(e) =>
                setNewPlaylist({ ...newPlaylist, description: e.target.value })
              }
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          {!isCreating && playlists.length > 0 ? (
            <>
              <button
                onClick={() => setIsCreating(true)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition"
              >
                + Create New Playlist
              </button>
              <button
                onClick={handleSaveToPlaylists}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
              >
                Save Video
              </button>
            </>
          ) : (
            <button
              onClick={handleCreatePlaylist}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
            >
              Save Playlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePlayListCard;
