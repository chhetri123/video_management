import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { YoutubeProvider } from "./context/YoutubeContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <YoutubeProvider>
        <App />
      </YoutubeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
