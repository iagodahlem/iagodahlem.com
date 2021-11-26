import { ElementType } from 'react'
import styled from 'styled-components'
import {
  compose,
  space,
  SpaceProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  border,
  BorderProps,
  position,
  PositionProps,
  flexbox,
  FlexboxProps,
} from 'styled-system'

type Props = SpaceProps &
  ColorProps &
  LayoutProps &
  BorderProps &
  PositionProps &
  FlexboxProps & {
    as?: ElementType
  }

const Box = styled.div<Props>(
  {},
  compose(layout, flexbox, space, color, border, position)
)

export default Box
