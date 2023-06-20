import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout, { mainLoader, mainAction } from "./layout/MainLayout";
import ErrorPage from "./pages/error";
import Home, { homeLoader, homeAction } from "./pages/home";
import Iphone from "./pages/iphone";
import Glass from "./pages/glass";
import ThreeJSDEmo from "./pages/threeJS";

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
          {
            path: "three",
            element: <ThreeJSDEmo />,
          },
          {
            path: "glass",
            element: <Glass />,
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
