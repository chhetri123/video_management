import React from "react";
import ReactDOM from "react-dom";
// import "semantic-ui-css/semantic.min.css";
import SeasonDisplay from "./components/SeasonDisplay/SeasonDispaly";
import Loader from "./components/Loader/Loader";
import Error from "./components/Error/Error";

class App extends React.Component {
  state = { lat: null, errMessage: null };

  componentDidMount() {
    // This method runs when render method is rendred (content is rendred on screen )
    // console.log("ComponentDid Mount ", this.state);
    window.navigator.geolocation.getCurrentPosition(
      (pos) => this.setState({ lat: pos.coords.latitude }),
      (err) => this.setState({ errMessage: err.message })
    );
  }

  //  this method runs when state is updated or component is updated .render menthod is called right before componentDipUpdate is invoked
  componentDidUpdate() {
    console.log("Component Did update", this.state);
  }

  // componentWillUnmount() {
  //   console.log("Component Will Unmount");
  // }

  renderContent() {
    if (this.state.errMessage && !this.state.lat) {
      return <Error msg={this.state.errMessage} />;
    }
    if (!this.state.errMessage && !this.state.lat) {
      return <Loader msg="Please allow the location to fetch data .." />;
    } else {
      return <SeasonDisplay lat={this.state.lat} />;
    }
  }
  render() {
    return <div className="ui ">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
