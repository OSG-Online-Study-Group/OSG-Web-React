import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    margin: 0;
    min-height: 100%;
  }

  body {
    background: #160c22;
    color: #fff;
    font-family: "DM Sans", "Segoe UI", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, textarea {
    font: inherit;
  }

  button {
    cursor: pointer;
  }
`;
