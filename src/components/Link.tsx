import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Text from './Text'
import { css } from '@styled-system/css'

const Link = (props) => (
  <Text
    as={GatsbyLink}
    css={css({
      color: 'black',
      textDecoration: 'none',
    })}
    {...props}
  />
)

export default Link
