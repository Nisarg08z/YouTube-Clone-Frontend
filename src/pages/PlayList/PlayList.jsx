import React, { useEffect, useContext, useState } from 'react';
import { getUserPlaylists } from '../../utils/api';
import { UserContext } from '../../contexts/UserContext';
import { PlayListGrid } from '../../components/PlayList';
import { EmptyPlayListPage } from '../../components/EmptysState';

const PlayList = ({ userid }) => {
    const { userDetail } = useContext(UserContext);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const user = userid || userDetail?._id;

        if (!user) {
            setLoading(true);
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

        fetchPlayList();
    }, [userid, userDetail]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div>
            {playlists.length > 0 ? (
                <PlayListGrid playlists={playlists} />
            ) : (
                <EmptyPlayListPage />
            )}
        </div>
    );
};

export default PlayList;
