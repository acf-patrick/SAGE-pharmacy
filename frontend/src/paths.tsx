import { AiTwotoneContainer } from "react-icons/ai";
import { SlBasket } from "react-icons/sl";
import { PiFactoryBold } from "react-icons/pi";

export const paths = [
  {
    to: "/stock",
    name: "Stock",
    icon: <AiTwotoneContainer />,
  },
  {
    to: "/purchase",
    name: "Achat",
    icon: <SlBasket />,
  },
  {
    to: "/provider",
    name: "Fournisseur",
    icon: <PiFactoryBold />,
  },
];
