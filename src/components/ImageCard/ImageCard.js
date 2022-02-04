import React from "react";
import "./ImageCard.css";
import Loader from "./../Loader/Loader";
class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.state = { spans: 0 };
  }
  setSpans = () => {
    const height = this.imageRef.current.clientHeight;
    const spans = Math.ceil(height / 10);
    this.imageRef.current.style.boxShadow =
      "0 0 8px 8px rgba(255, 255, 255, 0.24)";
    this.setState({ spans });
  };
  componentDidMount() {
    this.imageRef.current.addEventListener("load", this.setSpans);
  }
  render() {
    const loder =
      this.state.spans === 0 ? <Loader msg="Loading Image" size="small" /> : "";
    return (
      <>
        <div
          style={{
            gridRowEnd: `span ${this.state.spans}`,
            boxShadow: "10px 10px 16px #000000",
          }}
        >
          {loder}
          <img
            ref={this.imageRef}
            src={this.props.image.urls.regular}
            alt={this.props.image.description}
            className="Images"
          />
        </div>
      </>
    );
  }
}
export default ImageCard;
