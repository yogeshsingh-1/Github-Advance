import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="640249440952-saeo22sdb511is4309tho9m408gbjrqj.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
);
