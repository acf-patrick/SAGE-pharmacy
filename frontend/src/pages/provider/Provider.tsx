import styled from "styled-components";
import { Header } from "../../components";
import { Outlet } from "react-router-dom";

const StyledContainer = styled.div`
  padding: 0 2rem;
`;

export default function Provider() {
  return (
    <>
      <Header headerTitle="Fournisseurs 🏭" />
      <StyledContainer>
        <Outlet />
      </StyledContainer>
    </>
  );
}
