import React from 'react'
import { Flex, Link, Text } from 'iagodahlem-com'

export const Inline = () => (
  <Text fontSize='5'>
    Most of the writing links out —{' '}
    <Link href='https://github.com/iagodahlem' fontWeight='4'>
      the source is on GitHub
    </Link>{' '}
    — and Link keeps the body type while dropping the underline.
  </Text>
)

export const Standalone = () => (
  <Flex flexDirection='column' style={{ gap: '12px' }}>
    <Link href='/blog' fontSize='6' fontFamily='heading' fontWeight='4'>
      Blog
    </Link>
    <Link href='/projects' fontSize='6' fontFamily='heading' fontWeight='4'>
      Projects
    </Link>
    <Link href='/about' fontSize='6' fontFamily='heading' fontWeight='4'>
      About
    </Link>
  </Flex>
)

export const Muted = () => (
  <Flex alignItems='center' style={{ gap: '24px' }}>
    <Link href='#' fontSize='5'>Default ink</Link>
    <Link href='#' fontSize='5' color='gray.300'>Muted</Link>
    <Link href='#' fontSize='5' color='gray.500'>Quiet</Link>
  </Flex>
)
