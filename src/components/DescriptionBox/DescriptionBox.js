import React from "react";
import "./DescriptionBox.css";

class DescriptionBox extends React.Component {
  state = {
    subscribe: "SUBSCRIBE",
    isSubscribed: false,
    showMore: true,
  };

  onSubscibe = () => {
    if (this.state.isSubscribed) {
      this.setState({ subscribe: "SUBSCRIBE", isSubscribed: false });
    } else {
      this.setState({ subscribe: "SUBSCRIBED", isSubscribed: true });
    }
  };
  onShowClick = () => {
    if (this.state.showMore) {
      this.setState({ showMore: false });
    } else {
      this.setState({ showMore: true });
    }
  };
  render() {
    const { snippet } = this.props;
    const text = snippet.description;

    const bellIcon = this.state.isSubscribed ? (
      <i className="icon bell outline subscription_bell"></i>
    ) : (
      ""
    );
    return (
      <>
        <div className="ui item grid description_box">
          <div className="column">
            <img
              className="ui image"
              alt={snippet.title}
              src="http://carismartes.com.br/assets/global/images/avatars/avatar1_big.png"
            />
          </div>
          <div className="content">
            <div className="header">
              {snippet.channelTitle}&nbsp;&nbsp;
              <i className="icon check circle small"></i>
            </div>
            <div className="meta subscriber_Number">10M subscribers</div>
          </div>
          <div className="row Subscription_box">
            <div
              className={this.state.subscribe.toLowerCase()}
              onClick={this.onSubscibe}
            >
              {this.state.subscribe}
            </div>
            {bellIcon}
          </div>
          <div className="video_description">
            <div className="description">
              {this.state.showMore ? text.split(".")[0] : text}
              <div className="show_more" onClick={this.onShowClick}>
                {this.state.showMore ? "SHOW MORE" : "SHOW LESS"}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DescriptionBox;
