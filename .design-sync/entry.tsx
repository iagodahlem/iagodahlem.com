// Design-system entry for claude.ai/design. This is a SYNC INPUT, not app code —
// nothing in src/ imports it.
//
// Why it exists: this repo is a Gatsby site, not a published library. It has no
// `dist/`, and every file in src/components/ uses `export default`, which the
// converter's synthesized `export * from` entry cannot re-export. This file is
// the named barrel the bundler needs, scoped to the design system's reusable
// surface (src/components/index.tsx is the app's own barrel: it omits Button and
// includes page plumbing like Seo/Nav/Header/Articles).
import React, { ReactNode } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import theme from '../src/theme'
import GlobalStyle from '../src/components/GlobalStyle'

export { default as Box } from '../src/components/Box'
export { default as Flex } from '../src/components/Flex'
export { default as Text } from '../src/components/Text'
export { default as Heading } from '../src/components/Heading'
export { default as Link } from '../src/components/Link'
export { default as Container } from '../src/components/Container'
export { default as Section } from '../src/components/Section'
export { default as Button } from '../src/components/Button'
export { default as ProjectCard } from '../src/components/ProjectCard'
export { default as PreviewFrame } from '../src/components/PreviewFrame'

/**
 * Root wrapper for the design system. Every component reads its scales
 * (colors, space, fontSizes, fonts, fontWeights) from styled-components'
 * theme context, so anything rendered outside this provider loses all
 * token-based styling. It also mounts GlobalStyle, which sets the 62.5%
 * root font-size the type scale is calibrated against and paints the page
 * background/ink from the theme.
 *
 * @category Foundations
 */
export const DesignSystemProvider = ({ children }: { children?: ReactNode }) => (
  <StyledThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </StyledThemeProvider>
)

/** The raw theme object (styled-system scales) backing DesignSystemProvider. */
export { default as theme } from '../src/theme'
