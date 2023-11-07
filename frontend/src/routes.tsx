import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Stock } from "./pages";
import Purchase from "./pages/purchase/Purchase";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "stock",
        element: <Stock />,
      },
      {
        path: "achat",
        element: <Purchase />,
      },
    ],
  },
]);
