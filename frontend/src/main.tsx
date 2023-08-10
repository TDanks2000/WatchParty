import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { SocketContextProvider } from "./contexts";
import { GlobalStyle } from "./styles";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./assets/themes/dark";

import "the-new-css-reset/css/reset.css";
import "vidstack/styles/defaults.css";
import "vidstack/styles/community-skin/video.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <SocketContextProvider>
        <GlobalStyle />
        <App />
      </SocketContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
