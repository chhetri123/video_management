import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import ImageList from "./ImageList/ImageList";
import unsplash from "./../API/unsplash";
import "./App.css";
import Loader from "./Loader/Loader";
class App extends React.Component {
  state = { images: [], total: 0, err: null };
  onSearchSubmit = async (term) => {
    try {
      const response = await unsplash.get("/search/photos", {
        params: { query: term },
      });

      this.setState({
        images: response.data.results,
        total: response.data.total,
      });
    } catch (err) {
      this.setState({ err: err.message });
    }
  };

  render() {
    return (
      <div
        className="ui container"
        style={{ marginTop: "20px", backGroundColor: "black" }}
      >
        <SearchBar onSubmit={this.onSearchSubmit} />
        {this.state.err ? (
          <Loader msg={this.state.err} size="big" />
        ) : (
          <ImageList
            images={this.state.images}
            totalIimage={this.state.total}
          />
        )}
      </div>
    );
  }
}

export default App;
