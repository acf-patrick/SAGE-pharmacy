import styled from "styled-components";
import { appearFromLeft } from "../../styles/animations";

const StyledContainer = styled.div`
  padding: 0 2rem;

  h1 {
    animation: ${appearFromLeft} 500ms both;
  }
`;

export default function Provider() {
  return (
    <StyledContainer>
      <header>
        <h1>Fournisseurs 🏭</h1>
      </header>
    </StyledContainer>
  );
}
