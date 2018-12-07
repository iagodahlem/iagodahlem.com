import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

const Link = ({ as: T, ...props }) => (
  <T {...props} />
)

Link.defaultProps = {
  as: GatsbyLink,
}

export default Link
