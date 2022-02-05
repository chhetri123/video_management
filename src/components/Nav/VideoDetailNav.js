import React from "react";
import "./VideoDetailNav.css";
import { getCount } from "../Helper/helperStat";

class VideoDetailsNav extends React.Component {
  state = { likeClickStyle: "outline", dislikeClickStyle: "outline" };
  getLikedClicked = () => {
    if (this.state.likeClickStyle === "") {
      return this.setState({ likeClickStyle: "outline" });
    }
    if (this.state.dislikeClickStyle === "") {
      return this.setState({
        likeClickStyle: "",
        dislikeClickStyle: "outline",
      });
    }
    this.setState({ likeClickStyle: "" });
  };
  getDislikedClicked = () => {
    if (this.state.dislikeClickStyle === "") {
      return this.setState({ dislikeClickStyle: "outline" });
    }
    if (this.state.likeClickStyle === "") {
      return this.setState({
        dislikeClickStyle: "",
        likeClickStyle: "outline",
      });
    }

    this.setState({ dislikeClickStyle: "" });
  };
  render() {
    const { statistics, snippet } = this.props;
    return (
      <div className="ui grid nav_container">
        <div className="row">
          <div className="eight wide column viewCount_date">
            <span className="viewCount">{statistics.viewCount} views</span>
            <span>
              {Date(snippet.publishedAt).split(" ").slice(0, 4).join(" ")}
            </span>
          </div>
          <div
            className="two wide column"
            style={{ cursor: "pointer" }}
            onClick={this.getLikedClicked}
          >
            <i
              className={`icon thumbs up ${this.state.likeClickStyle}`}
              style={{ fontSize: "20px" }}
            ></i>
            &nbsp;&nbsp;
            <span style={{ fontSize: "15px" }}>
              {getCount(statistics.likeCount) || "LIKES"}
            </span>
          </div>
          <div
            className="three wide column"
            style={{ cursor: "pointer" }}
            onClick={this.getDislikedClicked}
          >
            <i
              className={`icon thumbs down  ${this.state.dislikeClickStyle}`}
              style={{ fontSize: "20px" }}
            ></i>
            &nbsp;&nbsp;
            <span style={{ fontSize: "15px" }}>DISLIKE</span>
          </div>
          <div>
            <i className="icon share" style={{ fontSize: "20px" }}>
              {" "}
            </i>
            &nbsp;&nbsp;
            <span style={{ fontSize: "17px" }}>SHARE</span>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoDetailsNav;
