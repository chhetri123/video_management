import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useYoutube } from "../context/YoutubeContext";
import VideoList from "../components/VideoList/VideoList";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { searchVideos, loading, error } = useYoutube();

  useEffect(() => {
    if (query) {
      searchVideos(query);
    }
  }, [query]);

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <div className="flex items-center space-x-4 mb-6">
        <h1 className="text-xl font-medium text-white">
          Search results for "{query}"
        </h1>
        <div className="flex-1 border-b border-gray-700"></div>
      </div>
      <VideoList />
    </div>
  );
}

export default SearchResults;
