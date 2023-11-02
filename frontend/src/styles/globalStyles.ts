import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
body {
  margin: unset;
  padding: unset;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
}

* {
  color: ${({ theme }) => theme.colors.text};
}

a {
  text-decoration: none;
}
`;
