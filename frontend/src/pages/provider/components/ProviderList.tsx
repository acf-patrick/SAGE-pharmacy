import { Link, useLoaderData } from "react-router-dom";

export default function ProviderList() {
  const { providers } = useLoaderData() as {
    providers: {
      id: string;
      name: string;
      min: number;
    }[];
  };

  return (
    <>
      {providers.map((provider, i) => (
        <div key={i}>
          <Link to={provider.id}>{provider.name}</Link>
        </div>
      ))}
    </>
  );
}
