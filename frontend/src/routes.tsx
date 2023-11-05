import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Stock } from "./pages";

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
