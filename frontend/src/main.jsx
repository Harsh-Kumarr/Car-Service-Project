import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; // ✅ USE APP, NOT ROUTES

createRoot(document.getElementById("root")).render(
  <App />
);