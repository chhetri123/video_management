import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useYoutube } from "../../context/YoutubeContext";
import VideoDetailNav from "../Nav/VideoDetailNav";
import Comment from "../Comment/Comment";
import DescriptionBox from "../DescriptionBox/DescriptionBox";

const VideoDetail = () => {
  const { videoId } = useParams();
  const { selectedVideo, fetchVideoById } = useYoutube();

  useEffect(() => {
    if (videoId) {
      window.scrollTo(0, 0);
      fetchVideoById(videoId);
    }
  }, [videoId]);

  if (!selectedVideo) return null;

  const { snippet, statistics } = selectedVideo;

  return (
    <div className="space-y-4">
      <div className="relative pt-[56.25%]">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={snippet.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <h1 className="text-2xl font-bold text-white">{snippet.title}</h1>
      <VideoDetailNav statistics={statistics} snippet={snippet} />

      <DescriptionBox video={selectedVideo} />

      <Comment comment={statistics.commentCount} />
    </div>
  );
};

export default VideoDetail;
