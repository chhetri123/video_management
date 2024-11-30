import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchLikedVideos } from "../APIs/youtube";
import VideoGrid from "../components/VideoGrid/VideoGrid";
import { useNavigate } from "react-router-dom";

const LikedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const handleVideoClick = (video) => {
    navigate(`/video/${video.id}?show=liked`);
  };

  const loadVideos = async (isNextPage = false) => {
    if (!accessToken) return;

    try {
      setLoading(true);
      const { items, nextPageToken: newNextPageToken } = await fetchLikedVideos(
        accessToken,
        isNextPage ? nextPageToken : null
      );

      setVideos((prev) => (isNextPage ? [...prev, ...items] : items));
      setNextPageToken(newNextPageToken);
      setHasMore(!!newNextPageToken);
    } catch (error) {
      console.error("Error loading liked videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVideos();
  }, [accessToken]);

  if (!accessToken) {
    return (
      <VideoGrid
        emptyMessage="Please sign in to view your liked videos"
        videos={[]}
      />
    );
  }

  return (
    <VideoGrid
      title="Liked Videos"
      videos={videos}
      loading={loading}
      hasMore={hasMore}
      onLoadMore={() => loadVideos(true)}
      emptyMessage="No liked videos found"
      onVideoClick={handleVideoClick}
    />
  );
};

export default LikedVideos;
