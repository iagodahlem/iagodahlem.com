import React from 'react'
import PropTypes from 'prop-types'
import Box from '../components/Box'

const PrinterLayout = ({ children }) => {
  return (
    <Box as='main' flex='1'>
      {children}
    </Box>
  )
}

PrinterLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default PrinterLayout
