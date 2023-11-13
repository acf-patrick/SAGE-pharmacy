import { AiTwotoneContainer } from "react-icons/ai";
import { BiPurchaseTag } from "react-icons/bi";
import { PiFactoryBold } from "react-icons/pi";
import { SlBasket } from "react-icons/sl";

const paths = [
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
    to: "/order",
    name: "Commande",
    icon: <BiPurchaseTag />,
  },
  {
    to: "/provider",
    name: "Fournisseur",
    icon: <PiFactoryBold />,
  },
];

export default paths;
