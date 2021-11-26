import React from 'react'
import { motion } from 'framer-motion'
import Flex from './Flex'
import Link from './Link'

const Nav = () => (
  <Flex as='nav'>
    <Link
      as={motion.a}
      href='https://github.com/iagodahlem'
      fontFamily='heading'
      whileHover={{ opacity: 0.6 }}
    >
      Github
    </Link>

    <Link
      as={motion.a}
      href='https://www.linkedin.com/in/iagodahlem'
      fontFamily='heading'
      px='3'
      whileHover={{ opacity: 0.6 }}
    >
      Linkedin
    </Link>

    <Link
      as={motion.a}
      href='https://instagram.com/iagodahlem'
      fontFamily='heading'
      whileHover={{ opacity: 0.6 }}
    >
      Instagram
    </Link>
  </Flex>
)

export default Nav
