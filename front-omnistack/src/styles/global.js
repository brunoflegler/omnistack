import { createGlobalStyle } from 'styled-components';
import { colors } from './index';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'react-datepicker/dist/react-datepicker.css';

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html, body, #root{
    height: 100%;
  }

  body {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    background: ${colors.secundary};
    font-family: 'Source Sans Pro', sans-serif;
    color: ${colors.white};
  }

  input, button {
    font-family: 'Source Sans Pro', sans-serif; 
  }

  button {
    cursor: pointer
  }

`;

export default GlobalStyle;
