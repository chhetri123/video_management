import React from "react";
import "./Loader.css";
class Loader extends React.Component {
  render() {
    const dynamicClass = `ui ${this.props.size} text loader`;
    return (
      <>
        <div className="ui segment">
          <div className="ui active dimmer">
            <div className={dynamicClass}>{this.props.msg}</div>
          </div>
          <p></p>
          <p></p>
          <p></p>
        </div>
      </>
    );
  }
}
Loader.defaultProps = {
  msg: "Loading ..",
};
export default Loader;
