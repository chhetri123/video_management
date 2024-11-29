import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchBox from "./components/SearchBox/SearchBox";
import Home from "./pages/Home";
import VideoPage from "./pages/VideoPage";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <div className="min-h-screen bg-dark">
      <header className="bg-primary py-4 px-6 mb-6">
        <SearchBox />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
