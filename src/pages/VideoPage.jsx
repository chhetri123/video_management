import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import VideoDetail from "../components/VideoDetails/VideoDetail";
import VideoList from "../components/VideoList/VideoList";
import { useAuth } from "../context/AuthContext";
import { fetchPlaylistItems, fetchLikedVideos } from "../APIs/youtube";
import VideoItem from "../components/VideoItem/VideoItem";
import VideoSkeleton from "../components/VideoItem/VideoSkeleton";
import InfiniteScroll from "../components/InfiniteScroll/InfiniteScroll";

function VideoPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { videoId } = useParams();
  const { accessToken } = useAuth();
  const playlistId = searchParams.get("playlist");
  const showLiked = searchParams.get("show") === "liked";

  const [sidebarVideos, setSidebarVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);

  const loadSidebarVideos = async (isNextPage = false) => {
    if (!accessToken) return;
    setLoading(true);

    try {
      let response;
      if (playlistId) {
        response = await fetchPlaylistItems(
          playlistId,
          isNextPage ? nextPageToken : null,
          accessToken
        );
        const formattedItems = response.items.map((item) => ({
          ...item,
          id: item.snippet.resourceId.videoId,
        }));
        setSidebarVideos((prev) =>
          isNextPage ? [...prev, ...formattedItems] : formattedItems
        );
        // console.log(sidebarVideos);
      } else if (showLiked) {
        response = await fetchLikedVideos(
          accessToken,
          isNextPage ? nextPageToken : null
        );
        setSidebarVideos((prev) =>
          isNextPage ? [...prev, ...response.items] : response.items
        );
      }

      if (response) {
        setNextPageToken(response.nextPageToken);
        setHasMore(!!response.nextPageToken);
      }
    } catch (error) {
      console.error("Error loading sidebar videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (playlistId || showLiked) {
      loadSidebarVideos();
    }
  }, [playlistId, showLiked, accessToken]);

  const handleSidebarVideoClick = (video) => {
    const queryParams = new URLSearchParams(searchParams);
    if (showLiked) {
      queryParams.set("show", "liked");
    } else if (playlistId) {
      queryParams.set("playlist", playlistId);
    }
    const videoId =
      video.id?.videoId || video.id || video.snippet?.resourceId?.videoId;
    navigate(`/video/${videoId}?${queryParams.toString()}`);
  };

  const filteredSidebarVideos = sidebarVideos.filter((video) => {
    const sidebarVideoId =
      video.id?.videoId || video.id || video.snippet?.resourceId?.videoId;
    return sidebarVideoId !== videoId;
  });
  // find the current video in the sidebar videos
  const currentVideoIndex = sidebarVideos.findIndex(
    (video) => video.id === videoId
  );

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 lg:gap-8">
        <div className="lg:col-span-3 lg:border-r lg:border-gray-700/50 lg:pr-8">
          {sidebarVideos.length > 0 && (
            <VideoDetail
              sidebarVideos={filteredSidebarVideos}
              currentVideoIndex={currentVideoIndex}
            />
          )}
          {searchParams.size === 0 && (
            <VideoDetail
              sidebarVideos={filteredSidebarVideos}
              currentVideoIndex={currentVideoIndex}
            />
          )}
        </div>
        <div className="lg:col-span-1 lg:pl-4">
          <h2 className="text-xl font-semibold text-white mb-4">
            {playlistId
              ? "Playlist Videos"
              : showLiked
              ? "Liked Videos"
              : "Related Videos"}
          </h2>
          {playlistId || showLiked ? (
            <InfiniteScroll
              loading={loading}
              hasMore={hasMore}
              onLoadMore={() => loadSidebarVideos(true)}
              className="space-y-4"
            >
              <div className="space-y-4">
                {filteredSidebarVideos.map((video, index) => (
                  <div
                    key={`sidebar-${
                      video.id?.videoId ||
                      video.id ||
                      video.snippet?.resourceId?.videoId
                    }-${index}`}
                    onClick={() => handleSidebarVideoClick(video)}
                    className="cursor-pointer hover:bg-gray-800/50 rounded-lg transition-colors"
                  >
                    <VideoItem
                      video={video}
                      playlistId={playlistId}
                      isRelated={true}
                    />
                  </div>
                ))}
                {loading &&
                  Array(3)
                    .fill(null)
                    .map((_, index) => (
                      <VideoSkeleton key={`sidebar-skeleton-${index}`} />
                    ))}
              </div>
            </InfiniteScroll>
          ) : (
            <VideoList
              isRelatedVideos={true}
              onVideoSelect={handleSidebarVideoClick}
              currentVideoId={videoId}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
