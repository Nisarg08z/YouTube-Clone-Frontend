import React, { useEffect, useContext, useState } from 'react';
import { getUserPlaylists } from '../../utils/api';
import { UserContext } from '../../contexts/UserContext';
import { PlayListGrid } from '../../components/PlayList';
import { EmptyPlayListPage } from '../../components/EmptysState';

const PlayList = ({ userid }) => {
    const { userDetail } = useContext(UserContext);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const user = userid || userDetail._id;

        if (!user) {
            setError("User not found.");
            return;
        }

        const fetchPlayList = async () => {
            try {
                const response = await getUserPlaylists(user);
                setPlaylists(response);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayList();
    }, [ userDetail, userid]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
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
