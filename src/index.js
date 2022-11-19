import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter } from "react-router-dom";
// import "./i18Next/I18Next";

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Suspense fallback="loading">
      <App />
    </Suspense>
  </BrowserRouter>,
  //  </React.StrictMode>,
  document.getElementById("root")
);
