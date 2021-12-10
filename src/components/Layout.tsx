import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './GlobalStyle'
import Box from './Box'
import Flex from './Flex'
import Header from './Header'
import Nav from './Nav'
import theme from '../theme'

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <link
          href='https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700|Arvo:400,700'
          rel='stylesheet'
        />
      </Helmet>

      <GlobalStyle />

      <Header />

      <Box as='main' flex='1' mt='header'>
        {children}
      </Box>

      <Flex as='footer' justifyContent='center' px='4' py='4'>
        <Nav />
      </Flex>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
