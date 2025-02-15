import React, { useEffect, useContext, useState } from 'react';
import { getUserPlaylists } from '../../utils/api';
import { UserContext } from '../../contexts/UserContext';
import { PlayListGrid } from '../../components/PlayList';

const PlayList = () =>  {
    const { userDetail } = useContext(UserContext);
    const [playlists, setPlaylists] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userDetail) return;

        if (!userDetail._id) {
            setError("User not found.");
            setLoading(false);
            return;
        }

        const fetchPlayList = async () => {
            try {
                const response = await getUserPlaylists(userDetail._id);
                setPlaylists(response);
            } catch (err) {
                console.error(err);
                setError("Failed to load playlists.");
            } finally {
                setLoading(false);
            }
        };

        fetchPlayList();
    }, [userDetail]); 

    if (!userDetail) return <div className="text-center">Loading user...</div>;
    if (loading) return <div className="text-center">Loading playlists...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return playlists.length > 0 ? (
        <PlayListGrid playlists={playlists}/>
    ) : (
        <EmptyHomePage />
    );
}

export default PlayList;
