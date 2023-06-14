import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout, { mainLoader, mainAction } from "./layout/MainLayout";
import ErrorPage from "./pages/error";
import Home, { homeLoader, homeAction } from "./pages/home";
import Iphone from "./pages/iphone";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: mainLoader,
    action: mainAction,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "room",
            element: <Home />,
            loader: homeLoader,
            action: homeAction,
          },
          {
            path: "iphone",
            element: <Iphone />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
