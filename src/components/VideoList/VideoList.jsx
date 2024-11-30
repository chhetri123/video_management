import React from "react";
import VideoItem from "../VideoItem/VideoItem";
import VideoSkeleton from "../VideoItem/VideoSkeleton";
import { useYoutube } from "../../context/YoutubeContext";
import InfiniteScroll from "../InfiniteScroll/InfiniteScroll";
import { useLocation, useNavigate } from "react-router-dom";

const VideoList = ({
  isRelatedVideos = false,
  onVideoSelect,
  currentVideoId,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSearchPage = location.pathname === "/search";
  const {
    videos,
    loading,
    hasMore,
    loadMoreSearchResults,
    loadRecommendedVideos,
  } = useYoutube();

  const loadMore = () => {
    if (isSearchPage) {
      loadMoreSearchResults();
    } else {
      loadRecommendedVideos(true);
    }
  };

  // Filter out the current video from related videos
  const filteredVideos = currentVideoId
    ? videos.filter(
        (video) => (video.id?.videoId || video.id) !== currentVideoId
      )
    : videos;

  const handleVideoClick = (video) => {
    if (onVideoSelect) {
      onVideoSelect(video);
    } else {
      navigate(`/video/${video.id?.videoId || video.id}`);
    }
  };

  // Array of 12 items for skeleton loading
  const skeletonArray = Array(12).fill(null);

  const gridClassName = isRelatedVideos
    ? "grid grid-cols-1 gap-4"
    : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6";

  // Initial loading state
  if (loading && !videos.length) {
    return (
      <div className={gridClassName}>
        {skeletonArray.map((_, index) => (
          <VideoSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-10">No videos found</div>
    );
  }

  return (
    <InfiniteScroll loading={loading} hasMore={hasMore} onLoadMore={loadMore}>
      <div className={gridClassName}>
        {filteredVideos.map((video, index) => (
          <div
            key={`${video.id?.videoId || video.id}-${index}`}
            onClick={() => handleVideoClick(video)}
            className="cursor-pointer"
          >
            <VideoItem video={video} isRelated={isRelatedVideos} />
          </div>
        ))}
        {loading &&
          Array(3)
            .fill(null)
            .map((_, index) => (
              <VideoSkeleton key={`loading-skeleton-${index}`} />
            ))}
      </div>
    </InfiniteScroll>
  );
};

export default VideoList;
