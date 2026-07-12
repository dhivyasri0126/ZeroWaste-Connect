import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
    <Toaster
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        style: { fontFamily: 'Inter, system-ui, sans-serif' },
        duration: 5000,
      }}
    />
  </BrowserRouter>
);