import { createGlobalStyle } from 'styled-components'
import themeGet from '@styled-system/theme-get'

const GlobalStyle = createGlobalStyle`
  html {
    -webkit-tap-highlight-color: transparent;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    -webkit-tap-highlight-color: inherit;
  }

  html {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${themeGet('fonts.body')};
    font-size: ${themeGet('fontSizes.5')};
    font-weight: ${themeGet('fontWeights.1')};
    background-color: ${themeGet('colors.white')};
    color: ${themeGet('colors.black')};
  }

  #gatsby-focus-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`

export default GlobalStyle
