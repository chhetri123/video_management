import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchPlaylistItems } from "../APIs/youtube";
import VideoItem from "../components/VideoItem/VideoItem";
import VideoSkeleton from "../components/VideoItem/VideoSkeleton";
import InfiniteScroll from "../components/InfiniteScroll/InfiniteScroll";

const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [playlistInfo, setPlaylistInfo] = useState(null);

  const loadVideos = async (isNextPage = false) => {
    if (!accessToken) return;

    try {
      setLoading(true);
      const { items, nextPageToken: newNextPageToken } =
        await fetchPlaylistItems(
          playlistId,
          isNextPage ? nextPageToken : null,
          accessToken
        );

      if (!isNextPage && items.length > 0) {
        setPlaylistInfo(items[0].snippet.playlistId);
      }

      const formattedVideos = items.map((item) => ({
        ...item,
        id: item.snippet.resourceId.videoId,
        snippet: {
          ...item.snippet,
          playlistId: playlistId,
        },
      }));

      setVideos((prev) =>
        isNextPage ? [...prev, ...formattedVideos] : formattedVideos
      );
      setNextPageToken(newNextPageToken);
      setHasMore(!!newNextPageToken);
    } catch (error) {
      console.error("Error loading playlist videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (playlistId) {
      loadVideos();
    }
  }, [playlistId, accessToken]);

  const handleVideoClick = (video) => {
    navigate(`/video/${video.id}?playlist=${playlistId}`);
  };

  if (!accessToken) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-xl font-semibold mb-4">
          Please sign in to view this playlist
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-6">
        <h1 className="text-2xl font-bold">Playlist Videos</h1>
        <div className="flex-1 border-b border-gray-700"></div>
      </div>

      <InfiniteScroll
        loading={loading}
        hasMore={hasMore}
        onLoadMore={() => loadVideos(true)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => handleVideoClick(video)}
              className="cursor-pointer"
            >
              <VideoItem video={video} />
            </div>
          ))}
          {loading &&
            Array(3)
              .fill(null)
              .map((_, index) => <VideoSkeleton key={`skeleton-${index}`} />)}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PlaylistDetails;
