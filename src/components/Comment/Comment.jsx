import React, { useEffect } from "react";
import CommentList from "./CommentList";
import { useYoutube } from "../../context/YoutubeContext";
import { useParams } from "react-router-dom";

const Comment = () => {
  const { videoId } = useParams();
  const { fetchVideoComments } = useYoutube();

  useEffect(() => {
    if (videoId) {
      fetchVideoComments(videoId);
    }
  }, [videoId]);

  return <CommentList />;
};

export default Comment;
