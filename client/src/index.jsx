import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-center" autoClose={1500}></ToastContainer>
  </React.StrictMode>
);
