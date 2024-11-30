import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchSubscriptionVideos } from "../APIs/youtube";
import VideoGrid from "../components/VideoGrid/VideoGrid";
import { useNavigate } from "react-router-dom";
import { formatTimeAgo } from "../components/Helper/helperStat";

const SubscriptionFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [channelIndex, setChannelIndex] = useState(0);
  const [channelIds, setChannelIds] = useState([]);
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const loadVideos = async (isNextPage = false) => {
    if (!accessToken) return;

    try {
      setLoading(true);
      const response = await fetchSubscriptionVideos(
        accessToken,
        isNextPage ? nextPageToken : null
      );

      if (response.channelIds) {
        setChannelIds(response.channelIds);
      }

      // Filter videos from last 2 days and add timeAgo
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      const filteredAndFormattedVideos = response.items
        .filter((video) => new Date(video.snippet.publishedAt) > twoDaysAgo)
        .map((video) => ({
          ...video,
          timeAgo: formatTimeAgo(video.snippet.publishedAt),
        }))
        .sort(
          (a, b) =>
            new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
        );

      setVideos((prev) => {
        if (isNextPage) {
          const combined = [...prev, ...filteredAndFormattedVideos];
          const unique = Array.from(
            new Map(combined.map((v) => [v.id, v])).values()
          );
          return unique.sort(
            (a, b) =>
              new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
          );
        }
        return filteredAndFormattedVideos;
      });

      setNextPageToken(response.nextPageToken);
      setHasMore(
        !!response.nextPageToken || channelIndex < channelIds.length - 1
      );

      if (!response.nextPageToken && channelIndex < channelIds.length - 1) {
        setChannelIndex((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error loading subscription videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadVideos();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [accessToken]);

  const handleVideoClick = (video) => {
    navigate(`/video/${video.id}`);
  };

  // Modify VideoItem component to show timeAgo
  const renderVideo = (video) => (
    <div
      key={video.id}
      onClick={() => handleVideoClick(video)}
      className="cursor-pointer bg-primary rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform"
    >
      <img
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
        className="w-full aspect-video object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {video.snippet.title}
        </h3>
        <p className="text-gray-400 text-sm mb-2">
          {video.snippet.channelTitle}
        </p>
        <div className="flex items-center text-gray-400 text-sm">
          <span>{video.timeAgo}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-6">
        <h1 className="text-2xl font-bold">Latest Videos (Last 2 Days)</h1>
        <div className="flex-1 border-b border-gray-700"></div>
      </div>

      {videos.length === 0 && !loading ? (
        <div className="text-center py-8">
          <p className="text-gray-400">
            No new videos from your subscriptions in the last 2 days
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map(renderVideo)}
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionFeed;
