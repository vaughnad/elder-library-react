import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DatabaseProvider } from "./hooks";

ReactDOM.render(
  <React.StrictMode>
    <DatabaseProvider>
      <App />
    </DatabaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
