import { useEffect, useState } from "react";
import styled from "styled-components";
import { Provider as ProviderType } from "../../models";
import { appearFromLeft } from "../../styles/animations";
import { api } from "../../api";
import { Header } from "../../components";

const StyledContainer = styled.div`
  padding: 0 2rem;
`;

const StyledHeader = styled(Header)`
  h1 {
    margin: 0;
    animation: ${appearFromLeft} 500ms both;
  }
`;

export default function Provider() {
  const [providers, setProviders] = useState<ProviderType[]>([]);

  useEffect(() => {
    api
      .get("/provider")
      .then((res) =>
        setProviders(
          res.data.map((provider) => Array(10).fill(provider)).flat()
        )
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <StyledHeader headerTitle="Fournisseurs 🏭"></StyledHeader>
      <StyledContainer>
        {providers.map((provider, i) => (
          <div key={i}>{provider.name}</div>
        ))}
      </StyledContainer>
    </>
  );
}
