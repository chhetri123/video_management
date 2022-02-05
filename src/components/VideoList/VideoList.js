import React from "react";
import VideoItem from "./../VideoItem/VideoItem";

const VideoList = ({ onSelectVideo, videos, term, error }) => {
  let sendheading = "";
  if (error) {
    sendheading = <div> Got {error}. Try again later</div>;
  } else if (videos.length > 0 && term !== "") {
    sendheading = (
      <div>
        Searching for <em> {term}</em>
      </div>
    );
  }
  const renderVideoList = videos.map((video) => {
    return (
      <VideoItem
        onSelectVideo={onSelectVideo}
        key={video.id.videoId}
        video={video}
      />
    );
  });

  return (
    <>
      {sendheading}
      <div className="ui relaxed divided list">{renderVideoList}</div>
    </>
  );
};
export default VideoList;
