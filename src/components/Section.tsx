import React from 'react'
import styled from 'styled-components'
import Box from './Box'

const Section = styled(Box)``

Section.defaultProps = {
  as: 'section',
  py: '6',
}

export default Section
