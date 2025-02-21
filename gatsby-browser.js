import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "./src/gatsby-plugin-theme-ui";
// import "prismjs/themes/prism.css" //default style
import "prismjs/themes/prism-tomorrow.css";//prism-okaidia/prism-coy/prism-solarized

import "./src/styles/prism-custom.css";

// custom typefaces
import "@fontsource-variable/montserrat"
import "@fontsource/merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/tailwind-default.css"
import "./src/style.css"

import "@fontsource/ibm-plex-sans/400.css"; // for body
import "@fontsource/ibm-plex-sans/700.css"; // for headings
import "@fontsource/ibm-plex-mono/400.css"; // for code

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
);
