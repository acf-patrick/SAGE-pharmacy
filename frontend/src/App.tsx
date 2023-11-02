import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/globalStyles.ts";
import { theme } from "./styles/theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
