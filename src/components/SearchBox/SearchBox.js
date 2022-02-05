import React from "react";
import "./SearchBox.css";

class SearchBox extends React.Component {
  state = { searchTerm: "" };
  onInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };
  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.searchField(this.state.searchTerm);
    this.setState({ searchTerm: "" });
  };
  render() {
    return (
      <div className="ui large action input">
        <div style={{ position: "absolute", left: "-20%", color: "white" }}>
          <a href="/">
            <img
              className="ui image"
              src="https://www.freeiconspng.com/thumbs/youtube-logo-png/youtube-logo-png-transparent-image-5.png"
              alt="logo"
              style={{ width: "70px", transform: "scale(3)" }}
            />
          </a>
        </div>
        <form
          className="ui form"
          onSubmit={this.onFormSubmit}
          style={{ left: "10%" }}
        >
          <input
            type="text"
            value={this.state.searchTerm}
            placeholder="Search for Videos..."
            onChange={this.onInputChange}
          />
          <button className="ui icon button">
            <i className="large search icon"></i>
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBox;
