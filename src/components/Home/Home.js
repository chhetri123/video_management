import React from "react";
import HomeCard from "./HomeCard";
class Home extends React.Component {
  render() {
    if (this.props.video.length === 0) return <div></div>;
    const homeCard = this.props.video.map((video) => (
      <HomeCard
        key={video.id + video.snippet.title}
        snippet={video.snippet}
        statistics={video.statistics}
        videoId={video.id}
        onSelect={this.props.onSelect}
      />
    ));
    return (
      <>
        <div className="ui four column grid">{homeCard}</div>
      </>
    );
  }
}
export default Home;
