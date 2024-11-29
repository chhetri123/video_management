import React, { useEffect } from "react";
import VideoDetail from "../components/VideoDetails/VideoDetail";
import VideoList from "../components/VideoList/VideoList";

function VideoPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smooth scrolling
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-8">
        <div className="lg:col-span-3 lg:border-r lg:border-gray-700/50 lg:pr-8">
          <VideoDetail />
        </div>
        <div className="lg:col-span-1 lg:pl-4">
          <h2 className="text-xl font-semibold text-white mb-4">
            Related Videos
          </h2>
          <VideoList isRelatedVideos={true} />
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
