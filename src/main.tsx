import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RootApp from "./App";
import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <RootApp />
  </BrowserRouter>
);
