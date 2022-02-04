import React from "react";
import "./searchBar.css";
class SearchBar extends React.Component {
  state = { inputValue: "" };
  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
  };

  render() {
    return (
      <div className="ui segment searchBar">
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <div className="field">
            <label htmlFor="search">Image Search</label>
            <input
              className="text"
              autoComplete="off"
              type="text"
              id="search"
              value={this.state.inputValue}
              placeholder="Enter the image name"
              onChange={(e) => this.setState({ inputValue: e.target.value })}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
