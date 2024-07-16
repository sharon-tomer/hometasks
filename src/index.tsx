import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import RootComponent from "./RootComponent";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
