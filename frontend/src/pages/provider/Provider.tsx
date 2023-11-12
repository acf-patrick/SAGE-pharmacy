import styled from "styled-components";
import { Header } from "../../components";
import { Outlet } from "react-router-dom";
import { lighten } from "polished";

const StyledContainer = styled.div`
  padding: 0 2rem;
`;

const StyledProvider = styled.div`
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      margin-right: 2rem;
      height: 3rem;
      padding: 5px 25px;
      background-color: ${({ theme }) => theme.colors.buttons.add};
      color: white;
      font-weight: 600;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: ${({ theme }) =>
          lighten(0.1, theme.colors.buttons.add)};
      }
    }
  }
`;

export default function Provider() {
  return (
    <StyledProvider>
      <div className="header">
        <Header headerTitle="Fournisseurs 🏭" />
        <button>Importer</button>
      </div>
      <StyledContainer>
        <Outlet />
      </StyledContainer>
    </StyledProvider>
  );
}
