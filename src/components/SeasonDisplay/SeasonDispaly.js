import React from "react";
import Time from "./../Time/time";
import "./SeasonDisplay.css";

class SeasonDisplay extends React.Component {
  seasonConfig = {
    Summer: {
      text: "Lets Hit the beach",
      iconName: "sun",
    },
    Winter: {
      text: "Burr, Its is Cold",
      iconName: "snowflake",
    },
  };
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const season = this.getSeason(new Date().getMonth);
    const { text, iconName } = this.seasonConfig[season];

    return (
      <>
        <div className={`season-display ${season}`}>
          <i className={`icon-left massive ${iconName} icon`}></i>
          <h1>{text}</h1>
          <Time />
          <i className={`icon-right massive ${iconName} icon`}></i>
        </div>
      </>
    );
  }

  getSeason(month) {
    if (month > 2 && month < 9) {
      return this.props.lat > 0 ? "Summer" : "Winter";
    } else {
      return this.props.lat > 0 ? "Winter" : "Summer";
    }
  }
}

export default SeasonDisplay;
