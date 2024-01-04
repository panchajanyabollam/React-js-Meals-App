import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import {AppProvider} from './context';

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);