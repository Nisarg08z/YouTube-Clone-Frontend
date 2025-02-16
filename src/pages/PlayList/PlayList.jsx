import React, { useEffect, useContext, useState } from 'react';
import { getUserPlaylists } from '../../utils/api';
import { UserContext } from '../../contexts/UserContext';
import { PlayListGrid } from '../../components/PlayList';
import { EmptyHomePage } from '../../components/EmptysState'

const PlayList = ({userid}) =>  {
    const { userDetail } = useContext(UserContext);
    const [playlists, setPlaylists] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!userDetail) return;

        const user = userid || userDetail._id

        if (!user) {
            setError("User not found.");
            setLoading(false);
            return;
        }

        const fetchPlayList = async () => {
            try {
                const response = await getUserPlaylists(user);
                setPlaylists(response);
            } catch (err) {
                console.error(err);
                setError("Failed to load playlists.");
            } finally {
                setLoading(false);
            }
        };

        if (!user) return <div className="text-center">Loading user...</div>;

        fetchPlayList();
    }, [userDetail, userid]); 

    if (loading) return <div className="text-center">Loading playlists...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return playlists.length > 0 ? (
        <PlayListGrid playlists={playlists}/>
    ) : (
        <EmptyHomePage />
    );
}

export default PlayList;
