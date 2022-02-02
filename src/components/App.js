import React from "react";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";
import unsplash from "./../API/unsplash";
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
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />

        <ImageList images={this.state.images} totalIimage={this.state.total} />
      </div>
    );
  }
}

export default App;
