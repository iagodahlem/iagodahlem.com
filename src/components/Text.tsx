import styled from 'styled-components'
import { typography, TypographyProps } from 'styled-system'
import Box from './Box'

type Props = TypographyProps & {
  textTransform?: 'uppercase' | 'lowercase' | 'none'
}

const Text = styled(Box)<Props>`
  ${typography}

  &&& {
    text-transform: ${(props) => props.textTransform};
  }
`

Text.defaultProps = {
  as: 'p',
  mt: 0,
  mb: 0,
}

export default Text
