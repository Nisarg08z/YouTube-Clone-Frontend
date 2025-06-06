import React, { useEffect, useContext, useState } from "react";
import { getUserPlaylists } from "../../utils/api";
import { UserContext } from "../../contexts/UserContext";
import { PlayListGrid } from "../../components/PlayList";
import { EmptyPlayListPage } from "../../components/EmptysState";

const PlayList = ({ userid }) => {
    const { userDetail } = useContext(UserContext);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <svg
                    className="animate-spin h-8 w-8 text-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-label="Loading spinner"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                </svg>
            </div>
        );

    if (error)
        return (
            <div className="text-center text-red-600 font-semibold mt-8 px-4">
                {error}
            </div>
        );

    return (
        <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-6">
            <div className="w-full max-w-7xl">
                {playlists.length > 0 ? (
                    <PlayListGrid playlists={playlists} />
                ) : (
                    <EmptyPlayListPage />
                )}
            </div>
        </div>
    );

};

export default PlayList;
