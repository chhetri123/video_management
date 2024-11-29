import React from "react";
import { useNavigate } from "react-router-dom";
import { formatViews, formatTimeAgo } from "../Helper/helperStat";

const VideoItem = ({ video }) => {
  const navigate = useNavigate();
  const { snippet, statistics, id, channelInfo } = video;

  const handleVideoClick = () => {
    navigate(`/video/${id.videoId ? id.videoId : id}`);
  };
  console.log(video);
  return (
    <div
      className="cursor-pointer hover:scale-105 transition-transform duration-200"
      onClick={handleVideoClick}
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={snippet.thumbnails.medium.url}
          alt={snippet.title}
          className="w-full rounded-xl"
        />
        {statistics?.viewCount && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs">
            {formatViews(statistics.viewCount)} views
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="mt-4 flex space-x-3">
        {/* Channel Avatar */}
        {channelInfo && (
          <img
            src={channelInfo.snippet.thumbnails.default.url}
            alt={channelInfo.snippet.title}
            className="w-9 h-9 rounded-full flex-shrink-0"
          />
        )}

        <div className="flex-1">
          <h3 className="font-medium line-clamp-2 text-sm">{snippet.title}</h3>
          <div className="mt-1 text-sm text-gray-400">
            <p>{snippet.channelTitle}</p>
            <div className="flex items-center space-x-1">
              <span>{formatViews(statistics?.viewCount)} views</span>
              <span>•</span>
              <span>{formatTimeAgo(snippet.publishedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
