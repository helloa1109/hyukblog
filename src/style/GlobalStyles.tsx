"use client"

import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  :root {
    --color-background: #0f0f13;
    --color-text: #f0f0f0;
    --color-primary: #ff5470;
    --color-secondary: #3bceac;
    --color-accent: #6b48ff;
    --color-dark: #1a1a2e;
    --color-light: #f0f0f0;
    --font-heading: 'Inter', sans-serif;
    --font-body: 'Inter', sans-serif;
    --transition-slow: 0.5s ease;
    --transition-medium: 0.3s ease;
    --transition-fast: 0.15s ease;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    background-color: var(--color-background);
    color: var(--color-text);
    font-family: var(--font-body);
    scroll-behavior: smooth;
    overflow-x: hidden;
    cursor: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 700;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    background: none;
    border: none;
    cursor: none;
    font-family: inherit;
  }

  section {
    padding: 80px 24px;
    
    @media (min-width: 768px) {
      padding: 100px 48px;
    }
    
    @media (min-width: 1200px) {
      padding: 120px 80px;
    }
  }

  @media (max-width: 768px) {
    html, body {
      cursor: auto;
    }
  }
`

export default GlobalStyles

