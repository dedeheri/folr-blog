import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./style.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// multi lang
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(languageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["id", "en"],
    fallbackLng: "id",
    debug: false,
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "./assets/locales/{{lng}}/translation.json",
    },
  });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
