import React from "react";

const VideoSkeleton = () => {
  return (
    <div className="animate-pulse duration-2">
      {/* Thumbnail skeleton */}
      <div className="relative pt-[56.25%] bg-gray-800 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-shimmer"></div>
      </div>

      <div className="flex space-x-3 mt-4">
        {/* Channel avatar skeleton */}
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-800" />

        {/* Text content skeleton */}
        <div className="flex-1 space-y-3">
          {/* Title */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded w-[85%]" />
            <div className="h-4 bg-gray-800 rounded w-[65%]" />
          </div>

          {/* Channel name and stats */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-800 rounded w-[40%]" />
            <div className="h-3 bg-gray-800 rounded w-[30%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSkeleton;
