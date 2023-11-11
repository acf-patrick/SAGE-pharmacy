import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider, Purchase, Stock } from "./pages";

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
      {
        path: "provider",
        element: <Provider />,
      },
    ],
  },
]);
