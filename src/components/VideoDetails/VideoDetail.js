import React from "react";
import VideoDetailsNav from "./../Nav/VideoDetailNav";
import DescriptionBox from "./../DescriptionBox/DescriptionBox";
import Comment from "./../Comment/Comment";
import "./VideoDetail.css";
import { getCount } from "../Helper/helperStat";
const VideoDetail = ({ video }) => {
  if (!video) return <div></div>;
  const { snippet, statistics } = video;
  const videoSrc = `https://www.youtube.com/embed/${
    video?.id || video.videoId
  }?&autoplay=1`;
  return (
    <>
      <div className="ui">
        <iframe
          width="750px"
          height="500px"
          src={videoSrc}
          title="video_player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        ></iframe>
      </div>
      <div className="ui">
        <div className="content detailContent">
          <div className="header">{snippet.title}</div>
          <VideoDetailsNav
            statistics={statistics}
            videoID={video?.id || video.videoId}
            snippet={snippet}
          />
          <DescriptionBox snippet={snippet} />
          <Comment comment={getCount(statistics.commentCount)} />
        </div>
      </div>
    </>
  );
};

export default VideoDetail;
