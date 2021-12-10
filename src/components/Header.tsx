import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import Flex from './Flex'
import Heading from './Heading'
import Menu from './Menu'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const openMenu = () => {
    setIsMenuOpen(true)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <Flex
      as='header'
      position='fixed'
      top='0'
      left='0'
      justifyContent='space-between'
      alignItems='center'
      width='100%'
      height='header'
      px={4}
    >
      <Heading
        as={motion.h1}
        fontFamily='heading'
        fontSize='8'
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to='/'>I.</Link>
      </Heading>

      <Menu
        isOpen={isMenuOpen}
        open={openMenu}
        close={closeMenu}
        toggle={toggleMenu}
      />
    </Flex>
  )
}

export default Header
