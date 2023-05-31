import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout, { mainLoader } from "./layout/MainLayout";
import ErrorPage from "./pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: mainLoader,
    errorElement: <ErrorPage />,
    children: [],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
