import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import ThemeProvider from "./theme/index";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
