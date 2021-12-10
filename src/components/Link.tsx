import React from 'react'
import Text from './Text'
import { css } from '@styled-system/css'

const Link = (props) => (
  <Text
    as='a'
    css={css({
      color: 'black',
      textDecoration: 'none',
    })}
    {...props}
  />
)

export default Link
