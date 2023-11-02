import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/globalStyles.ts";
import { theme } from "./styles/theme";
import { Outlet, RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";
import SideBar from "./components/SideBar.tsx";

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
