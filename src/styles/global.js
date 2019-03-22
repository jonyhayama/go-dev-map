import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body{
    background: #ddd;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothig: antialiased !important;
    font-family: sans-serif;
  }
`;

export default GlobalStyle;
