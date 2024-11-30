import React, { useEffect } from "react";
import { useYoutube } from "../context/YoutubeContext";
import VideoList from "../components/VideoList/VideoList";

function Home() {
  const { loadRecommendedVideos } = useYoutube();

  useEffect(() => {
    loadRecommendedVideos();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <div className="flex items-center space-x-4 mb-6">
        <h1 className="text-2xl font-bold text-white">Recommended</h1>
        <div className="flex-1 border-b border-gray-700"></div>
      </div>
      <VideoList isRelatedVideos={false} />
    </div>
  );
}

export default Home;
