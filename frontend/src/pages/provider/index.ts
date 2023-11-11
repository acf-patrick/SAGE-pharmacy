import { api } from "../../api";

export async function providersLoader() {
  const res = await api.get("/provider");

  return {
    providers: res.data.map((provider) => ({
      id: provider.id,
      name: provider.name,
      min: provider.min,
    })),
  };
}

export async function providerLoader({ params }) {
  const res = await api.get(`/provider/${params.id}`);
  return res.data;
}
