import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { EuiProvider } from "@elastic/eui";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EuiProvider>
      <App />
    </EuiProvider>
  </React.StrictMode>
);
