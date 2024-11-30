import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchBox from "./components/SearchBox/SearchBox";
import Home from "./pages/Home";
import VideoPage from "./pages/VideoPage";
import SearchResults from "./pages/SearchResults";
import { AuthProvider } from "./context/AuthContext";
import UserPlaylists from "./pages/UserPlaylists";
import LikedVideos from "./pages/LikedVideos";
import ChannelPage from "./pages/ChannelPage";
import PlaylistDetails from "./pages/PlaylistDetails";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-dark">
        <header className="bg-primary py-4 px-6 mb-6">
          <SearchBox />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/video/:videoId" element={<VideoPage />} />
            <Route path="/playlists" element={<UserPlaylists />} />
            <Route path="/liked-videos" element={<LikedVideos />} />
            <Route path="/channel/:channelId" element={<ChannelPage />} />
            <Route path="/playlist/:playlistId" element={<PlaylistDetails />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
