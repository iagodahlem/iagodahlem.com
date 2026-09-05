import React from 'react'
import { Box, Flex, PreviewFrame, Text } from 'iagodahlem-com'

// The 'live' state mounts a sandboxed iframe against the public internet, so it
// is not statically renderable and is deliberately not previewed here — see
// NOTES.md. These are the two placeholder plates, which is what a card shows
// whenever a demo is missing or down.
const Frame = ({ children }: { children?: React.ReactNode }) => (
  <Box maxWidth='420px' border='1px solid' borderColor='gray.700' borderRadius='10px' overflow='hidden'>
    {children}
  </Box>
)

export const LinkDown = () => (
  <Frame>
    <PreviewFrame state='down' title='clock-panel' language='TypeScript' note='Link is down' />
  </Frame>
)

export const NoDemo = () => (
  <Frame>
    <PreviewFrame state='none' title='knife-hit' language='JavaScript' note='No live demo' />
  </Frame>
)

export const Languages = () => (
  <Flex style={{ gap: '16px', flexWrap: 'wrap' }}>
    {(['TypeScript', 'JavaScript', 'Ruby'] as const).map((lang) => (
      <Box key={lang} width='260px' border='1px solid' borderColor='gray.700' borderRadius='10px' overflow='hidden'>
        <PreviewFrame state='none' title={lang} language={lang} note='No live demo' />
      </Box>
    ))}
  </Flex>
)
