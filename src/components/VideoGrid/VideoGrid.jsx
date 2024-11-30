import React from "react";
import VideoItem from "../VideoItem/VideoItem";
import VideoSkeleton from "../VideoItem/VideoSkeleton";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";

const VideoGrid = ({
  title,
  videos,
  loading,
  hasMore,
  onLoadMore,
  emptyMessage,
  isPlaylist = false,
  onVideoClick,
}) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-xl font-semibold mb-4">
          {emptyMessage || "No videos found"}
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {title && (
        <div className="flex items-center space-x-4 mb-6">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex-1 border-b border-gray-700"></div>
        </div>
      )}

      <InfiniteScroll
        loading={loading}
        hasMore={hasMore}
        onLoadMore={onLoadMore}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={isPlaylist ? video.snippet.resourceId.videoId : video.id}
              onClick={() => onVideoClick?.(video)}
              className="cursor-pointer"
            >
              <VideoItem
                video={
                  isPlaylist
                    ? {
                        ...video,
                        id: video.snippet.resourceId.videoId,
                      }
                    : video
                }
              />
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

export default VideoGrid;
