import React from "react";
import { useNavigate } from "react-router-dom";
import { formatViews, formatTimeAgo } from "../Helper/helperStat";

const VideoItem = ({ video, playlistId, isRelated = false }) => {
  const navigate = useNavigate();

  // Early return if video is not defined
  if (!video || !video.snippet) {
    return null;
  }

  // Handle different video data structures
  const videoId =
    video.id?.videoId || video.id || video.snippet?.resourceId?.videoId;
  const thumbnailUrl =
    video.snippet?.thumbnails?.medium?.url ||
    video.snippet?.thumbnails?.default?.url ||
    "https://via.placeholder.com/320x180.png?text=No+Thumbnail";

  const handleClick = () => {
    const queryParams = new URLSearchParams();
    if (playlistId) {
      queryParams.set("playlist", playlistId);
    }
    navigate(`/video/${videoId}?${queryParams.toString()}`);
  };

  return (
    <div
      className={`flex ${
        isRelated ? "flex-row gap-2" : "flex-col"
      } cursor-pointer rounded-lg transition-colors`}
    >
      <div
        className={`relative ${isRelated ? "w-40 flex-shrink-0" : "w-full"}`}
      >
        <img
          src={thumbnailUrl}
          alt={video.snippet.title}
          className="w-full aspect-video object-cover rounded-lg"
          loading="lazy"
        />
        {video.contentDetails?.duration && (
          <span className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-xs">
            {video.contentDetails.duration}
          </span>
        )}
      </div>
      <div className={`flex ${isRelated ? "flex-1" : "gap-2 mt-2 p-2"}`}>
        {!isRelated && video.snippet?.channelThumbnail && (
          <img
            src={video.snippet.channelThumbnail}
            alt={video.snippet.channelTitle}
            className="w-9 h-9 rounded-full"
          />
        )}
        <div className="flex flex-col flex-1 min-w-0">
          <h3
            className={`font-semibold line-clamp-2 ${
              isRelated ? "text-sm" : ""
            }`}
          >
            {video.snippet.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            {video.snippet.channelTitle}
          </p>
          {video.statistics && !isRelated && (
            <div className="text-gray-400 text-xs flex items-center gap-1">
              <span>{formatViews(video.statistics.viewCount)} views</span>
              <span>•</span>
              <span>{formatTimeAgo(video.snippet.publishedAt)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
