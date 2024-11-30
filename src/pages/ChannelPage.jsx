import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchUserChannel, fetchUserUploads } from "../APIs/youtube";
import { formatViews } from "../components/Helper/helperStat";
import { useParams, useNavigate } from "react-router-dom";
import VideoGrid from "../components/VideoGrid/VideoGrid";

const UserChannel = () => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  const [channelInfo, setChannelInfo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    const loadChannelInfo = async () => {
      if (accessToken && channelId) {
        const channelData = await fetchUserChannel(accessToken, channelId);
        setChannelInfo(channelData);
        if (channelData?.contentDetails?.relatedPlaylists?.uploads) {
          loadVideos(channelData.contentDetails.relatedPlaylists.uploads);
        }
      }
    };
    loadChannelInfo();
  }, [accessToken, channelId]);

  const loadVideos = async (uploadsPlaylistId, isNextPage = false) => {
    try {
      const { items, nextPageToken: newNextPageToken } = await fetchUserUploads(
        accessToken,
        uploadsPlaylistId,
        isNextPage ? nextPageToken : null
      );

      const formattedVideos = items.map((item) => ({
        ...item,
        id: item.snippet.resourceId.videoId,
      }));
      setVideos((prev) =>
        isNextPage ? [...prev, ...formattedVideos] : formattedVideos
      );

      setNextPageToken(newNextPageToken);
      setHasMore(!!newNextPageToken);
      setLoading(false);
    } catch (error) {
      console.error("Error loading videos:", error);
      setLoading(false);
    }
  };

  const handleVideoClick = (video) => {
    localStorage.setItem("videoSource", JSON.stringify(videos));
    navigate(`/video/${video.id}`);
  };

  if (!accessToken) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-xl font-semibold mb-4">
          Please sign in to view channel details
        </h2>
      </div>
    );
  }

  if (loading && !channelInfo) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-40 bg-gray-800 rounded-lg mb-6"></div>
          <div className="h-8 w-48 bg-gray-800 rounded mb-4"></div>
          <div className="h-4 w-32 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Channel Header */}
      {channelInfo?.brandingSettings?.image?.bannerExternalUrl && (
        <div className="w-full h-40 md:h-60 rounded-lg overflow-hidden mb-6">
          <img
            src={channelInfo.brandingSettings.image.bannerExternalUrl}
            alt="Channel Banner"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex items-start space-x-6 mb-8">
        <img
          src={channelInfo?.snippet?.thumbnails?.default?.url}
          alt={channelInfo?.snippet?.title}
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {channelInfo?.snippet?.title}
          </h1>
          <div className="flex items-center space-x-4 text-gray-400">
            <span>
              {formatViews(channelInfo?.statistics?.subscriberCount)}{" "}
              subscribers
            </span>
            <span>•</span>
            <span>
              {formatViews(channelInfo?.statistics?.videoCount)} videos
            </span>
            <span>•</span>
            <span>{formatViews(channelInfo?.statistics?.viewCount)} views</span>
          </div>
          {channelInfo?.snippet?.description && (
            <p className="mt-4 text-gray-300 line-clamp-3">
              {channelInfo.snippet.description}
            </p>
          )}
        </div>
      </div>

      {/* Channel Videos */}
      <VideoGrid
        title="Uploads"
        videos={videos}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={() =>
          loadVideos(
            channelInfo?.contentDetails?.relatedPlaylists?.uploads,
            true
          )
        }
        emptyMessage="No videos found"
        onVideoClick={handleVideoClick}
        isPlaylist={true}
      />
    </div>
  );
};

export default UserChannel;
