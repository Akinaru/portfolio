import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import InfoProjectPage from "./pages/InfoProjectPage";

const detectBrowserLanguage = () => {
  return navigator.language.startsWith("fr") ? "fr" : "en";
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={`/${detectBrowserLanguage()}`} replace />,
  },
  {
    path: "/:lang",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "project/:id",
        element: <InfoProjectPage />,
      }
    ]
  },
  {
    path: "*",
    element: <Navigate to={`/${detectBrowserLanguage()}`} replace />,
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}