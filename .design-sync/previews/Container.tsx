import React from 'react'
import { Box, Container, Heading, Text } from 'iagodahlem-com'

export const Default = () => (
  <Box bg='gray.900' py='4'>
    <Container>
      <Heading fontSize='7' fontFamily='heading' fontWeight='4' mb='3'>
        The reading column
      </Heading>
      <Text fontSize='5'>
        Container is the measure every page is set in: full width, capped at
        640px, centred, with 32px of side padding so text never touches the
        viewport edge on a phone.
      </Text>
    </Container>
  </Box>
)

export const Wider = () => (
  <Box bg='gray.900' py='4'>
    <Container maxWidth='960px'>
      <Text fontSize='5'>
        maxWidth=&apos;960px&apos; — the projects page widens the same
        component rather than introducing a second one.
      </Text>
    </Container>
  </Box>
)
