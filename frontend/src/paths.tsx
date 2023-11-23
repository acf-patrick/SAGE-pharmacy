import { AiTwotoneContainer } from "react-icons/ai";
import { MdOutlineViewKanban } from "react-icons/md";
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
    icon: <MdOutlineViewKanban />,
  },
  {
    to: "/provider",
    name: "Fournisseurs",
    icon: <PiFactoryBold />,
  },
];

export default paths;
