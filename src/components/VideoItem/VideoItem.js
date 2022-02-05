import React from "react";
import "./VideoItem.css";
import { getDate } from "./../Helper/helperStat";

const VideoItem = ({ video, onSelectVideo }) => {
  const { title, thumbnails, channelTitle, publishTime } = video.snippet;
  video.publishDate = getDate(publishTime);
  return (
    <div onClick={() => onSelectVideo(video)} className="video-item item">
      <img className="ui image" alt={title} src={thumbnails.medium.url} />
      <div className="content">
        <div className="header" style={{ color: "white" }}>
          {title}
        </div>
        <div className="description" style={{ color: "white" }}>
          {channelTitle}
          <div className="ui disabled" style={{ marginTop: "5px" }}>
            <em>{getDate(publishTime)}</em>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
