import React from 'react'
import { Box, Text } from 'iagodahlem-com'

const Swatch = ({ label, ...rest }: any) => (
  <Box p='3' bg='gray.900' borderRadius='6px' {...rest}>
    <Text fontSize='4' color='gray.200'>{label}</Text>
  </Box>
)

export const Surfaces = () => (
  <Box display='flex' style={{ gap: '16px', flexWrap: 'wrap' }}>
    <Swatch label="bg='gray.900'" />
    <Swatch label="bg='gray.800'" bg='gray.800' />
    <Swatch label="bg='gray.700'" bg='gray.700' />
  </Box>
)

export const Spacing = () => (
  <Box display='flex' flexDirection='column' style={{ gap: '12px' }}>
    {([
      ["p='2' \u2014 8px", '2'],
      ["p='3' \u2014 16px", '3'],
      ["p='4' \u2014 32px", '4'],
    ] as const).map(([label, scale]) => (
      <Box key={scale} bg='gray.900' p={scale} borderRadius='6px'>
        <Text fontSize='4' color='gray.200'>{label}</Text>
      </Box>
    ))}
  </Box>
)

export const Borders = () => (
  <Box display='flex' style={{ gap: '16px', flexWrap: 'wrap' }}>
    <Box p='3' border='1px solid' borderColor='gray.700' borderRadius='10px'>
      <Text fontSize='4' color='gray.200'>1px / radius 10px</Text>
    </Box>
    <Box p='3' border='1px solid' borderColor='gray.300'>
      <Text fontSize='4' color='gray.200'>gray.300, square</Text>
    </Box>
  </Box>
)

export const Polymorphic = () => (
  <Box display='flex' flexDirection='column' style={{ gap: '8px' }}>
    <Box as='article' p='3' bg='gray.900' borderRadius='6px'>
      <Text fontSize='4' color='gray.200'>as=&apos;article&apos;</Text>
    </Box>
    <Box as='footer' p='3' bg='gray.900' borderRadius='6px'>
      <Text fontSize='4' color='gray.200'>as=&apos;footer&apos;</Text>
    </Box>
  </Box>
)
