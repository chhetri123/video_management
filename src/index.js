import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lat: null, lng: null, errMessage: null };

    window.navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.setState({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => this.setState({ errMessage: err.message })
    );
  }
  render() {
    if (this.state.errMessage && !this.state.lat) {
      return <h1>Error:{this.state.errMessage}</h1>;
    }
    if (!this.state.errMessage && !this.state.lat) {
      return <h1>Loading...</h1>;
    } else {
      return <h1>Coordinates:{`${this.state.lat},${this.state.lng}`}</h1>;
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
