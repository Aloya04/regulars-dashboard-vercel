import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import App from "./App"; 
import "./index.css"; 


ReactDOM.createRoot(document.getElementById("root")).render(
  // 'react.strictmode' helps find potential problems in the app during development.
  <React.StrictMode>
    {/* 'browserrouter' needs to wrap the'app' so that routing works everywhere. */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
