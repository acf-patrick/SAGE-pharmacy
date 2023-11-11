import { useEffect, useState } from "react";
import styled from "styled-components";
import { Provider as ProviderType } from "../../models";
import { appearFromLeft } from "../../styles/animations";
import { api } from "../../api";

const StyledContainer = styled.div`
  padding: 0 2rem;

  h1 {
    animation: ${appearFromLeft} 500ms both;
  }
`;

export default function Provider() {
  const [providers, setProviders] = useState<ProviderType[]>([]);

  useEffect(() => {
    api
      .get("/provider")
      .then((res) => setProviders(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <StyledContainer>
      <header>
        <h1>Fournisseurs 🏭</h1>
      </header>
      {providers.map((provider, i) => (
        <div key={i}>{provider.name}</div>
      ))}
    </StyledContainer>
  );
}
