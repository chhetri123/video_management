import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, MoreVertical, Flag } from "lucide-react";
import { formatViews, formatTimeAgo } from "../Helper/helperStat";

const VideoDetailNav = ({ statistics, snippet }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const ActionButton = ({ icon: Icon, onClick, active, count }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 
        ${
          active ? "bg-gray-700 hover:bg-gray-600" : "hover:bg-gray-800"
        } group`}
    >
      <Icon
        size={20}
        className={`${active ? "text-blue-500" : "text-gray-300"} 
          group-hover:scale-110 transition-transform duration-200`}
      />
      {count && <span className="text-sm">{count}</span>}
    </button>
  );

  return (
    <div className="flex flex-col space-y-4 border-b border-gray-700/50 pb-4">
      <div className="flex items-center justify-between">
        {/* Stats Section */}
        <div className="flex items-center space-x-2 text-gray-400">
          <span className="font-medium text-white">
            {formatViews(statistics.viewCount)} Views
          </span>
          <span className="text-lg">•</span>
          <span className="text-sm">{formatTimeAgo(snippet.publishedAt)}</span>
        </div>

        {/* Actions Section */}
        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-800/50 rounded-full p-1">
            <ActionButton
              icon={ThumbsUp}
              count={formatViews(statistics.likeCount)}
              onClick={handleLike}
              active={liked}
            />
            <div className="h-full w-[1px] bg-gray-700/50 mx-1" />
            <ActionButton
              icon={ThumbsDown}
              onClick={handleDislike}
              active={disliked}
            />
          </div>

          <div className="relative group">
            <ActionButton icon={MoreVertical} />
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1">
                <button className="flex items-center space-x-2 px-4 py-2 w-full hover:bg-gray-700 text-sm">
                  <Flag size={16} />
                  <span>Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailNav;
