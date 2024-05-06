import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom/dist";
import App from "./App";
import "./dictonaries/i18n";
import "./index.css";
import { StrictMode } from "react";
console.log(process.env);
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  console.log("App running in production mode");
}

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);
