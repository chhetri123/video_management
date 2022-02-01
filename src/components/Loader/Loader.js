import React from "react";

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <>
        <div className="ui active dimmer">
          <div className="ui massive text loader">{this.props.msg}</div>
        </div>
        <p></p>
        <p></p>
        <p></p>
      </>
    );
  }
}
Loader.defaultProps = {
  msg: "Loading ..",
};
export default Loader;
