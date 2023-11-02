import { createBrowserRouter } from "react-router-dom";
import Stock from "./stock/Stock";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "stock",
        element: <Stock />,
      },
    ],
  },
]);
