import React from 'react'
import { motion } from 'framer-motion'
import Flex from './Flex'
import Text from './Text'

const Nav = () => (
  <Flex as='nav'>
    <Text
      as={motion.a}
      href='https://github.com/iagodahlem'
      fontFamily='heading'
      whileHover={{ opacity: 0.6 }}
    >
      Github
    </Text>

    <Text
      as={motion.a}
      href='https://www.linkedin.com/in/iagodahlem'
      fontFamily='heading'
      px='3'
      whileHover={{ opacity: 0.6 }}
    >
      Linkedin
    </Text>

    <Text
      as={motion.a}
      href='https://instagram.com/iagodahlem'
      fontFamily='heading'
      whileHover={{ opacity: 0.6 }}
    >
      Instagram
    </Text>
  </Flex>
)

export default Nav
