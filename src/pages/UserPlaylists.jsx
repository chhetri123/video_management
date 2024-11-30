import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchUserPlaylists } from "../APIs/youtube";
import { useNavigate } from "react-router-dom";

const UserPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadPlaylists = async () => {
      if (accessToken) {
        const { items } = await fetchUserPlaylists(accessToken);
        setPlaylists(items);
        setLoading(false);
      }
    };
    loadPlaylists();
  }, [accessToken]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Playlists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            onClick={() => navigate(`/playlist/${playlist.id}`)}
            className="bg-primary rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <img
              src={playlist.snippet.thumbnails.medium.url}
              alt={playlist.snippet.title}
              className="w-full aspect-video object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">
                {playlist.snippet.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {playlist.contentDetails.itemCount} videos
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPlaylists;
