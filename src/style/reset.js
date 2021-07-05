import { css } from '@emotion/react';

const reset = css`
* {
  box-sizing: border-box;
}
body, div, h1 {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
}
a {
  text-decoration: none;
}
ul {
  list-style: none;
}
button {
  all: unset;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
`;

export default reset;
