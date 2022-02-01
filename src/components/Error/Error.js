import React from "react";
import "./Error.css";

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <>
        <div className="Error">
          <h2>{this.props.msg} :( </h2>
        </div>
      </>
    );
  }
}
export default Error;
