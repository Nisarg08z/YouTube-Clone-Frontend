import React, { useEffect, useContext, useState } from 'react';
import { getUserPlaylists } from '../../utils/api';
import { UserContext } from '../../contexts/UserContext';
import { PlayListGrid } from '../../components/PlayList';
import { EmptyPlayListPage } from '../../components/EmptysState';
import { useNavigate } from 'react-router-dom';

const PlayList = ({ userid }) => {
    const { isLogedin, userDetail } = useContext(UserContext);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogedin) {
            navigate('/login'); 
            return;
        }

        if (!userDetail) return;

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
    }, [isLogedin, userDetail, userid, navigate]);

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
