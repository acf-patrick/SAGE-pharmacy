import { lighten } from "polished";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
body {
  margin: unset;
  padding: unset;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
}

* {
  color: ${({ theme }) => theme.colors.text};
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;

  }

  &::-webkit-scrollbar-track {
    background: #80808017;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.tertiary};
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => lighten(0.2, theme.colors.tertiary)};
  }
}

a {
  text-decoration: none;
}

`;
