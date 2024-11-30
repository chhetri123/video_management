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
import Subscriptions from "./pages/Subscriptions";
import SubscriptionFeed from "./pages/SubscriptionFeed";

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
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/feed/subscriptions" element={<SubscriptionFeed />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
