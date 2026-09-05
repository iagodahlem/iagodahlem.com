import React from 'react'
import { Flex, Heading, Text } from 'iagodahlem-com'

export const Levels = () => (
  <Flex flexDirection='column' style={{ gap: '20px' }}>
    <Heading as='h1' fontSize='9' fontFamily='heading' fontWeight='4'>
      Iago Dahlem
    </Heading>
    <Heading as='h2' fontSize='7' fontFamily='heading' fontWeight='4'>
      Scalable front-end
    </Heading>
    <Heading as='h3' fontSize='6' fontFamily='heading' fontWeight='4'>
      Architecture fundamentals
    </Heading>
    <Heading as='h4' fontSize='5' fontFamily='heading' fontWeight='3'>
      The state layer
    </Heading>
  </Flex>
)

export const WithBody = () => (
  <Flex flexDirection='column' style={{ gap: '12px' }}>
    <Heading as='h2' fontSize='8' fontFamily='heading' fontWeight='4'>
      5 truths about Tailwind CSS
    </Heading>
    <Text fontSize='4' color='gray.300' textTransform='uppercase' style={{ letterSpacing: '0.08em' }}>
      21 January 2022
    </Text>
    <Text fontSize='5'>
      Heading carries no size of its own — it renders as an h2 and inherits
      Text. Set fontSize and fontWeight explicitly for the level you want.
    </Text>
  </Flex>
)
