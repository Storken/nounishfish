import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'PressStart2P';
    src: url('/assets/PressStart2P-Regular.ttf');
    font-style: bold;
    font-weight: 600;
    font-display: swap;
  }

  html, body {
    padding: 0;
    margin: 0;
    font-family: monospace;
    font-size: 16px;
    color: #fff;
  }

  h1, h2, h3, h4, h5 {
    font-family: 'PressStart2P', cursive;
    color: #fff;
  }

  a {
    color: inherit;
    text-decoration: none;
    color: #fff;
  }

  * {
    box-sizing: border-box;
    color: #fff;
  }
`
