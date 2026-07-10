import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../components/GlobalStyle'
import PrinterLayout from './PrinterLayout'
import SiteLayout from './SiteLayout'
import theme, { printTheme } from '../theme'

const Layout = ({ children, pageContext }) => {
  const isPrinter = pageContext?.layout === 'printer'

  return (
    <ThemeProvider theme={isPrinter ? printTheme : theme}>
      <Helmet>
        <link
          href='https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700|Arvo:400,700'
          rel='stylesheet'
        />
      </Helmet>

      <GlobalStyle />

      {isPrinter ? (
        <PrinterLayout>{children}</PrinterLayout>
      ) : (
        <SiteLayout>{children}</SiteLayout>
      )}
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
