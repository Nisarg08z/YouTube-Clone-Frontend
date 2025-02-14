import React, { useState, useEffect } from "react";
import { getUserPlaylists, createPlaylist, saveVideoToPlaylist } from "../../utils/api";

const CreatePlayListCard = ({ videoId, userId, onClose }) => {
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylist, setNewPlaylist] = useState({ name: "", description: "" });
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);
    const [isCreating, setIsCreating] = useState(false); 

    // console.log("userid :- ", userId)
    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const userPlaylists = await getUserPlaylists(userId);
                setPlaylists(userPlaylists);
                if (userPlaylists.length === 0) {
                    setIsCreating(true);
                }
            } catch (error) {
                console.error("Error fetching playlists:", error);
            }
        };
        fetchPlaylists();
    }, [userId]);

    const handleCreatePlaylist = async () => {
        if (!newPlaylist.name.trim()) return;
        try {
            const newPlaylistData = await createPlaylist(newPlaylist.name, newPlaylist.description);
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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
            <div className="bg-gray-900 p-5 rounded-lg w-80 text-white">
                <h2 className="text-lg font-bold mb-4">Save To Playlist</h2>

                {/* Show playlists if they exist */}
                {!isCreating && playlists.length > 0 ? (
                    <div className="mb-3">
                        {playlists.map((playlist) => (
                            <label key={playlist._id} className="flex items-center mb-2">
                                <input 
                                    type="checkbox" 
                                    className="mr-2"
                                    checked={selectedPlaylists.includes(playlist._id)}
                                    onChange={(e) => {
                                        setSelectedPlaylists(prev => 
                                            e.target.checked ? [...prev, playlist._id] : prev.filter(id => id !== playlist._id)
                                        );
                                    }}
                                />
                                {playlist.name}
                            </label>
                        ))}
                    </div>
                ) : (
                 
                    <>
                        <input
                            type="text"
                            placeholder="Enter playlist name"
                            className="w-full p-2 rounded bg-gray-800 text-white mb-2"
                            value={newPlaylist.name}
                            onChange={(e) => setNewPlaylist({ ...newPlaylist, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Enter description"
                            className="w-full p-2 rounded bg-gray-800 text-white mb-4"
                            value={newPlaylist.description}
                            onChange={(e) => setNewPlaylist({ ...newPlaylist, description: e.target.value })}
                        />
                    </>
                )}

                {!isCreating && playlists.length > 0 ? (
                    <>
                        <button onClick={() => setIsCreating(true)} className="w-full bg-purple-500 p-2 rounded mb-2">
                            Create New Playlist
                        </button>
                        <button onClick={handleSaveToPlaylists} className="w-full bg-blue-500 p-2 rounded">
                            Save
                        </button>
                    </>
                ) : (
                    <button onClick={handleCreatePlaylist} className="w-full bg-green-500 p-2 rounded mb-2">
                        Save Playlist
                    </button>
                )}

                <button onClick={onClose} className="w-full bg-gray-700 p-2 rounded mt-2">Close</button>
            </div>
        </div>
    );
};

export default CreatePlayListCard;
