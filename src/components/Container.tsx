import React from 'react'
import Box from './Box'

const Container = (props) => (
  <Box width={1} maxWidth='840px' m='0 auto' px={4} {...props} />
)

export default Container
