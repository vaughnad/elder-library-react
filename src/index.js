import React from "react";
import ReactDOM from "react-dom";
import App from "./layout/App";
import { DatabaseProvider } from "./hooks";
import { HashRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <DatabaseProvider>
      <Router>
        <App />
      </Router>
    </DatabaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
