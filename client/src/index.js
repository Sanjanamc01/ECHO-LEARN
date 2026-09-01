import React from "react";                     // 1
import ReactDOM from "react-dom/client";       // 2
import "./index.css";                          // 3 (ok if different styles)
import App from "./App";                       // 4

const root = ReactDOM.createRoot(             // 6
  document.getElementById("root")             // 7
);

root.render(                                  // 9
  <React.StrictMode>                          // 10
    <App />                                   // 11
  </React.StrictMode>
);
