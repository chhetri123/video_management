import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useYoutube } from "../../context/YoutubeContext";
import VideoDetailNav from "../Nav/VideoDetailNav";
import Comment from "../Comment/Comment";
import DescriptionBox from "../DescriptionBox/DescriptionBox";

const VideoDetail = ({ sidebarVideos, currentVideoIndex }) => {
  const { videoId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectedVideo, fetchVideoById } = useYoutube();
  const [autoplay, setAutoplay] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videoId) {
      window.scrollTo(0, 0);
      fetchVideoById(videoId);

      if (!window.YT) {
        // Add the YouTube iframe API script if not already loaded
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Set the YouTube API ready callback
        window.onYouTubeIframeAPIReady = () => {
          initializePlayer(videoId);
        };
      } else if (playerRef.current) {
        // Load the new video if the player is already initialized
        playerRef.current.loadVideoById(videoId);
      } else {
        // Initialize the player if YouTube API is already loaded
        initializePlayer(videoId);
      }
    }

    // Cleanup when the component unmounts
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId]);

  // Initialize the YouTube Player
  const initializePlayer = (videoId) => {
    playerRef.current = new window.YT.Player("youtube-iframe", {
      videoId,
      playerVars: {
        autoplay: autoplay ? 1 : 0,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onStateChange: handlePlayerStateChange,
      },
    });
  };

  // Handle YouTube Player state changes
  const handlePlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED && autoplay) {
      if (
        currentVideoIndex !== -1 &&
        currentVideoIndex < sidebarVideos.length
      ) {
        const nextVideo = sidebarVideos[currentVideoIndex];
        if (nextVideo) {
          const queryParams = new URLSearchParams(searchParams);
          navigate(`/video/${nextVideo.id}?${queryParams.toString()}`);
        }
      }
    }
  };

  if (!selectedVideo) return null;

  const { snippet, statistics } = selectedVideo;

  return (
    <div className="space-y-4">
      <div className="relative pt-[56.25%]">
        <div
          id="youtube-player"
          className="absolute top-0 left-0 w-full h-full"
        >
          <div id="youtube-iframe" className="w-full h-full" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">{snippet.title}</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Autoplay</span>
          <button
            onClick={() => setAutoplay(!autoplay)}
            className={`w-12 h-6 rounded-full transition-colors ${
              autoplay ? "bg-blue-600" : "bg-gray-600"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                autoplay ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      <VideoDetailNav statistics={statistics} snippet={snippet} />
      <DescriptionBox video={selectedVideo} />
      <Comment comment={statistics.commentCount} />
    </div>
  );
};

export default VideoDetail;
