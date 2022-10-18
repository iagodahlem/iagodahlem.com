import React from 'react'
import PropTypes from 'prop-types'
import Box from '../components/Box'
import Flex from '../components/Flex'
import Header from '../components/Header'
import Nav from '../components/Nav'

const SiteLayout = ({ children }) => {
  return (
    <>
      <Header />

      <Box as='main' flex='1' mt='header'>
        {children}
      </Box>

      <Flex as='footer' justifyContent='center' px='4' py='4'>
        <Nav />
      </Flex>
    </>
  )
}

SiteLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SiteLayout
