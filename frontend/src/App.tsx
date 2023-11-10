import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/globalStyles.ts";
import { theme } from "./styles/theme";
import { NotificationProvider } from "./contexts/provider";
import { Sidebar, ToastNotification } from "./components";

if (import.meta.env.PROD) {
  document.addEventListener("contextmenu", (e) => e.preventDefault());
  document.body.style.userSelect = "none";
}

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
        <Sidebar />
        <div className="right">
          <NotificationProvider>
            <Outlet />
            <ToastNotification />
          </NotificationProvider>
        </div>
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;
