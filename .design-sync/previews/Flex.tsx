import React from 'react'
import { Box, Flex, Text } from 'iagodahlem-com'

const Cell = ({ children }: { children?: React.ReactNode }) => (
  <Box px='3' py='2' bg='gray.900' borderRadius='6px'>
    <Text fontSize='4' color='gray.200'>{children}</Text>
  </Box>
)

export const Row = () => (
  <Flex alignItems='center' style={{ gap: '12px' }}>
    <Cell>one</Cell>
    <Cell>two</Cell>
    <Cell>three</Cell>
  </Flex>
)

export const Column = () => (
  <Flex flexDirection='column' style={{ gap: '12px' }}>
    <Cell>first</Cell>
    <Cell>second</Cell>
    <Cell>third</Cell>
  </Flex>
)

export const SpaceBetween = () => (
  <Flex alignItems='center' justifyContent='space-between' border='1px solid' borderColor='gray.700' borderRadius='8px' p='3'>
    <Text fontSize='5' fontFamily='heading' fontWeight='4'>Iago Dahlem</Text>
    <Flex alignItems='center' style={{ gap: '16px' }}>
      <Cell>blog</Cell>
      <Cell>projects</Cell>
    </Flex>
  </Flex>
)

export const Centered = () => (
  <Flex alignItems='center' justifyContent='center' height='160px' bg='gray.900' borderRadius='8px'>
    <Text fontSize='5' color='gray.200'>centred both ways</Text>
  </Flex>
)
