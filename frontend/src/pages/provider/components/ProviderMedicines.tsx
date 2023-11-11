import { useLoaderData } from "react-router-dom";
import { Provider } from "../../../models";

export default function ProviderMedicines() {
  const provider = useLoaderData() as Provider;

  return provider.name;
}
