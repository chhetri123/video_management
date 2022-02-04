import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import ImageList from "./ImageList/ImageList";
import unsplash from "./../API/unsplash";
import "./App.css";
class App extends React.Component {
  state = { images: [], total: 0 };
  onSearchSubmit = async (term) => {
    const response = await unsplash.get("/search/photos", {
      params: { query: term },
    });
    this.setState({
      images: response.data.results,
      total: response.data.total,
    });
  };
  render() {
    return (
      <div
        className="ui container"
        style={{ marginTop: "20px", backGroundColor: "black" }}
      >
        <SearchBar onSubmit={this.onSearchSubmit} />

        <ImageList images={this.state.images} totalIimage={this.state.total} />
      </div>
    );
  }
}

export default App;
