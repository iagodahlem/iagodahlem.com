import React from 'react'
import { Box, Button, Flex, Text } from 'iagodahlem-com'

// Button is deliberately typographic: transparent background, no border, Arvo
// at fontSize='6'/fontWeight='4', 48px tall. Its canonical use is the header's
// menu trigger (src/components/Menu.tsx) — this is not a filled-pill system.
export const Default = () => (
  <Flex alignItems='center' style={{ gap: '32px' }}>
    <Button as='button'>Menu</Button>
    <Button as='button'>Get in touch</Button>
  </Flex>
)

export const Sizes = () => (
  <Flex alignItems='center' style={{ gap: '32px' }}>
    <Button as='button' fontSize='4' height='32px'>Small</Button>
    <Button as='button'>Default — fontSize 6</Button>
    <Button as='button' fontSize='8' height='64px'>Large</Button>
  </Flex>
)

export const Tones = () => (
  <Flex alignItems='center' style={{ gap: '32px' }}>
    <Button as='button'>Default ink</Button>
    <Button as='button' color='gray.300'>Muted</Button>
    <Button as='button' color='gray.500'>Quiet</Button>
  </Flex>
)

// How it actually appears on the site: a 72px header band with the trigger
// pushed to the right edge.
export const InHeader = () => (
  <Flex
    as='header'
    height='header'
    alignItems='center'
    justifyContent='space-between'
    px='4'
    borderBottom='1px solid'
    borderColor='gray.800'
  >
    <Text fontFamily='heading' fontSize='6' fontWeight='4'>Iago Dahlem</Text>
    <Button as='button'>Menu</Button>
  </Flex>
)
