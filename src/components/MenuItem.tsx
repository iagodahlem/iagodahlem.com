import React from 'react'
import css from '@styled-system/css'
import { motion } from 'framer-motion'
import Text from './Text'

const MenuItem = (props) => (
  <Text
    as={motion.li}
    py='2'
    fontFamily='heading'
    fontSize='6'
    fontWeight='4'
    css={css({ listStyle: 'none' })}
    variants={{
      open: {
        x: 0,
        opacity: 1,
        transition: {
          y: { stiffness: 1000, velocity: -100 },
        },
      },
      closed: {
        x: 50,
        opacity: 0,
        transition: {
          y: { stiffness: 1000 },
        },
      },
    }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    {...props}
  />
)

export default MenuItem
