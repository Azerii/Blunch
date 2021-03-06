import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Gordita Bold";
    font-style: normal;
    font-weight: normal;
    src: url("/font/Gordita\ Bold.woff");
    font-display: swap;
  }

  @font-face {
    font-family: "Gordita Medium";
    font-style: normal;
    font-weight: normal;
    src: url("/font/Gordita\ Medium.woff");
    font-display: swap;
  }

  @font-face {
    font-family: "Gordita Regular";
    font-style: normal;
    font-weight: normal;
    src: url("/font/Gordita\ Regular.woff");
    font-display: swap;
  }

  :root {
    --primary: #7b0304;
    --primary_dark: #4b0202;
    --background: #f6f6f6;
    --text: #1a1a1a;
    --sup_text: #8d9091;
    --success: #1ac79c;
    --warning: #d48806;
    --danger: #cc2364;
    --info: #1b15c2;
    --border_color: #efefef;
    --white: #ffffff;
    --font_bold: "Gordita Bold";
    --font_medium: "Gordita Medium";
    --font_regular: "Gordita Regular";
    --filter_grey: brightness(0%) saturate(100%) invert(99%) sepia(58%)
      saturate(216%) hue-rotate(187deg) brightness(112%) contrast(93%);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    scroll-behavior: smooth;
    font-size: 10px;
  }

  body {
    font-family: var(--font_medium), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    color: var(--text);
  }

  input:focus {
    outline: none;
  }

  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
  }

  input,
  button,
  select,
  textarea {
    font-family: var(--font_medium);
  }

  input:focus,
  button:focus,
  select:focus,
  textarea:focus {
    outline: none;
  }

  select {
    appearance: none;
  }

  textarea {
    resize: none;
  }

  ::placeholder {
    color: var(--sup_text);
    font-family: var(--font_medium);
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  ul {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* Headings */

  h1 {
    font-size: 36px;
    font-style: normal;
    font-weight: 500;
    line-height: 48px;
    letter-spacing: 0em;
  }

  h2 {
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: 0em;
  }

  h3 {
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: 0em;
  }

  h4 {
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: 0em;
  }

  h5 {
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
  }

  /* Paragraphs */

  p {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
  }

  .sup {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
  }

  .small {
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0em;
  }

  .fontBold {
    font-family: var(--font_bold);
  }

  .fontRegular {
    font-family: var(--font_regular);
  }

`

const theme = {
  colors: {
    primary: "#7b0304",
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
