import React from "react";
import ReactDOM from "react-dom/client";
import { initBolt } from "../lib/utils/bolt";
import { darkTheme, Provider } from "@adobe/react-spectrum";

import Main from "./main";

import "../style/prelude.css";
import "../style/index.css";

initBolt();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider theme={darkTheme}>
      <Main />
    </Provider>
  </React.StrictMode>
);
