import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout, { mainLoader, mainAction } from "./layout/MainLayout";
import ErrorPage from "./pages/error";
import Home, { homeLoader, homeAction } from "./pages/home";
import Iphone from "./pages/iphone";
import Glass from "./pages/glass";
import ThreeJSDEmo from "./pages/threeJS";
import Wechat from "./pages/wechat";
import RemoveBG from "./pages/removeBG";
import Cutout from "./pages/cutout";

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
          {
            path: "wechat",
            element: <Wechat />,
          },
          {
            path: "removebg",
            element: <RemoveBG />,
          },
          {
            path: "cutout",
            element: <Cutout />,
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
