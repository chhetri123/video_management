import React from "react";
import SongList from "./SongList";
import SongDetail from "./SongDetails";

const App = () => {
  return (
    <div className="ui container grid" style={{ marginTop: "20px" }}>
      <div className="column eight wided">
        <SongList />
      </div>
      <div>
        <SongDetail />
      </div>
    </div>
  );
};
export default App;
