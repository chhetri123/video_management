import React from "react";
import SearchBox from "./SearchBox/SearchBox";
import Youtube from "./../APIs/youtube";
import VideoList from "./VideoList/VideoList";
import VideoDetail from "./VideoDetails/VideoDetail";
import Home from "./Home/Home";

import "./App.css";

class App extends React.Component {
  state = {
    videos: [],
    searchTerm: null,
    selectedVideo: null,
    homePage: 0,
    err: null,
    videoDetailClass: "",
    videoListClass: "",
  };
  getSearchField = async (term, video = "") => {
    try {
      const response = await Youtube.get("/search", {
        params: {
          q: term,
          type: "video",
        },
      });

      if (this.state.selectedVideo) {
        this.setState({
          videos: response.data.items,
          selectedVideo: null,
          videoDetailClass: "",
          videoListClass: "",
        });
      } else {
        if (this.state.homePage < 1 && video) {
          this.setState({
            selectedVideo: video,
            homePage: 1,
            videoDetailClass: "eleven wide column",
            videoListClass: "five wide column",
          });
        }
        this.setState({
          videos: response.data.items,
          searchTerm: term,
          homePage: 1,
        });
      }
    } catch (err) {
      this.setState({ err: err.message });
    }
  };
  async componentDidMount() {
    try {
      const response = await Youtube.get("/videos", {
        params: {
          chart: "mostPopular",
          part: "snippet,statistics",
          type: "video",
          regionCode: "NP",
          maxResults: 100,
        },
      });

      this.setState({ videos: response.data.items });
    } catch (err) {
      this.setState({ err: err.message });
    }
  }

  onVideoSelect = async (vedio, title = "") => {
    try {
      const response = await Youtube.get("/videos", {
        params: {
          part: "snippet,statistics,status",
          id: vedio.id?.videoId || vedio.videoId,
        },
      });
      document.documentElement.scrollTop = 0;
      response.data.items[0].snippet.publishDate = vedio.publishDate;
      if (this.state.homePage < 1) {
        return this.getSearchField(title, vedio);
      }

      this.setState({
        selectedVideo: response.data.items[0],
        searchTerm: title,
        videoDetailClass: "eleven wide column",
        videoListClass: "five wide column",
      });
    } catch (err) {
      console.log(err);
      this.setState({ err: err.message });
    }
  };
  render() {
    const feed =
      this.state.searchTerm === null ? (
        <Home video={this.state.videos} onSelect={this.onVideoSelect} />
      ) : (
        <div className="ui grid">
          <div className="ui row">
            <div className={this.state.videoDetailClass}>
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className={this.state.videoListClass}>
              <VideoList
                term={this.state.searchTerm}
                videos={this.state.videos}
                onSelectVideo={this.onVideoSelect}
                error={this.state.err}
              />
            </div>
          </div>
        </div>
      );
    return (
      <>
        <div className="ui container">
          <SearchBox searchField={this.getSearchField} />
          {feed}
        </div>
      </>
    );
  }
}

export default App;
