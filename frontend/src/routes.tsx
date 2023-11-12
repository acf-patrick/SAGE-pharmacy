import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { OrdersSummary, Provider, Purchase, Stock } from "./pages";
import { providersLoader, providerLoader } from "./pages/provider";
import {
  ProviderList,
  ProviderMedicines,
  ProviderNotFound,
} from "./pages/provider/components";

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
        path: "purchase",
        element: <Purchase />,
      },
      {
        path: "purchase/summary",
        element: <OrdersSummary />,
      },
      {
        path: "provider",
        element: <Provider />,
        children: [
          {
            path: "",
            loader: providersLoader,
            element: <ProviderList />,
          },
          {
            path: ":id",
            element: <ProviderMedicines />,
            loader: providerLoader,
            errorElement: <ProviderNotFound />,
          },
        ],
      },
    ],
  },
]);
