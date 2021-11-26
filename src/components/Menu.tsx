import React, { FC } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import Box from './Box'
import Flex from './Flex'
import Button from './Button'
import MenuItem from './MenuItem'

type Props = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const variants = {
  open: {
    transition: { staggerChildren: 0.07 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const Menu: FC<Props> = ({ isOpen, open, close, toggle }) => (
  <Box height='100%' onMouseEnter={open} onMouseLeave={close}>
    <Button
      as={motion.button}
      height='100%'
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
    >
      Menu
    </Button>

    <Box
      as={motion.nav}
      position='absolute'
      top='100%'
      right={4}
      width='180px'
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <Flex
        as={motion.ul}
        flexDirection='column'
        alignItems='flex-end'
        width='100%'
        m='0'
        p='0'
        variants={variants}
      >
        <MenuItem>
          <Link to='/about'>About</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/blog'>Articles</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/talks'>Talks</Link>
        </MenuItem>
      </Flex>
    </Box>
  </Box>
)

export default Menu
