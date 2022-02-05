import React from "react";
import { getCount, getDate } from "./../Helper/helperStat";

const HomeCard = (props) => {
  const { snippet, statistics } = props;
  snippet.publishDate = getDate(snippet.publishedAt);

  return (
    <>
      <div
        className="card column"
        style={{
          cursor: "pointer",
          transform: "scale(0.9)",
          marginLeft: "-15px",
          marginRight: "15px",
          borderBottom: "1px solid #aaaaaa",
        }}
        onClick={() => {
          props.onSelect(props);
        }}
      >
        <div className="blurring dimmable image">
          <div className="ui dimmer">
            <div className="content">
              <div className="center">
                <div className="ui inverted button">Add Friend</div>
              </div>
            </div>
          </div>
          <img
            src={snippet.thumbnails.medium.url}
            alt="name"
            style={{ width: "270px" }}
          />
        </div>
        <div className="content grid" style={{ width: "280px" }}>
          <div
            className="header"
            style={{ marginTop: "15px", padding: "10px 3px 0 0" }}
          >
            {snippet.title}
          </div>
          <div
            className="ui item grid description_box"
            style={{ marginTop: "20px", border: "none" }}
          >
            <div className="content">
              <div className="header">
                {snippet.channelTitle}&nbsp;&nbsp;
                <i className="icon check circle small"></i>
              </div>
              <div
                className="meta subscriber_Number"
                style={{ marginTop: "3px" }}
              >
                {getCount(statistics.viewCount) + " Views"}
                &nbsp;&nbsp;
                {Date(snippet.publishedAt).split(" ").slice(0, 4).join(" ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomeCard;
