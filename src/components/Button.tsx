import styled from 'styled-components'
import Text from './Text'

const Button = styled(Text)({
  alignItems: 'center',
  border: 'none',
  cursor: 'pointer',
})

Button.defaultProps = {
  display: 'inline-flex',
  height: '48px',
  padding: 0,
  fontFamily: 'heading',
  fontSize: '6',
  fontWeight: '4',
  bg: 'transparent',
  color: 'black',
}

export default Button
