import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import RouteConfig from "./RouteConfig.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RouteConfig />
  </BrowserRouter>
);
