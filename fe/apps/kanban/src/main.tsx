import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

import "./global.css";

async function deferRender() {
  const { worker } = await import("./mocks/browser");
  return worker.start();
}

deferRender().then(() => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
