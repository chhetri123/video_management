import React from "react";
import "./time.css";

class Time extends React.Component {
  state = { time: new Date().toLocaleTimeString("en-US") };
  componentDidMount() {
    setInterval(
      () => this.setState({ time: new Date().toLocaleTimeString("en-US") }),
      1000
    );
  }
  render() {
    return (
      <div className="time">
        <i className="clock  icon"></i>
        <span>{this.state.time}</span>
      </div>
    );
  }
}

export default Time;
