import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import SideBar from "./components/SideBar.tsx";
import { GlobalStyles } from "./styles/globalStyles.ts";
import { theme } from "./styles/theme";

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 280px calc(100vw - 280px);
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledContainer>
        <SideBar />
        <div className="right">
          <Outlet />
        </div>
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;
