import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PersonaProvider } from "./PersonaContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PersonaProvider>
      <App />
    </PersonaProvider>
  </StrictMode>
);
