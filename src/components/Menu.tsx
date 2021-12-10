import React, { FC } from 'react'
import { Link } from 'gatsby'
import { motion } from 'framer-motion'
import css from '@styled-system/css'
import Box from './Box'
import Flex from './Flex'
import Button from './Button'
import Text from './Text'

const routes = {
  '/about': 'About',
  '/blog': 'Articles',
  '/talks': 'Talks',
}

const variants = {
  open: {
    transition: { staggerChildren: 0.07 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

type Props = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
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
        {Object.entries(routes).map(([route, label]) => (
          <Text
            key={route}
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
          >
            <Link to={route}>{label}</Link>
          </Text>
        ))}
      </Flex>
    </Box>
  </Box>
)

export default Menu
