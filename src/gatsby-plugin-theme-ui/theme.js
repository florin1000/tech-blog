// src/gatsby-plugin-theme-ui/index.js

export default {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    secondary: '#05a',
    muted: '#f6f6f6',
  },
  fonts: {
    // body: 'system-ui, sans-serif',
    // heading: 'inherit',
    // monospace: 'Menlo, monospace',
    body: '"IBM Plex Sans", sans-serif',
    heading: '"IBM Plex Sans", sans-serif',
    monospace: '"IBM Plex Mono", monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  space: [0, 4, 8, 16, 32, 64],
  styles: {
    // These styles will be applied to your MDX/Markdown content
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      fontFamily: "heading",
      fontSize: 5,
      mt: 4,
      mb: 3,
    },
    h2: {
      fontFamily: "heading",
      fontSize: 4,
      mt: 4,
      mb: 3,
    },
    p: {
      fontSize: 2,
      mb: 3,
    },
    a: {
      color: "primary",
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      p: 3,
      bg: "muted",
    },
    code: {
      fontFamily: "monospace",
      fontSize: 1,
      color: "secondary",
    },
  },
};
