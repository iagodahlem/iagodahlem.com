import React from 'react'
import { Box, Container, Heading, Section, Text } from 'iagodahlem-com'

export const Default = () => (
  <Box bg='gray.900'>
    <Section>
      <Container>
        <Heading fontSize='7' fontFamily='heading' fontWeight='4' mb='3'>
          Section
        </Heading>
        <Text fontSize='5'>
          Renders as &lt;section&gt; with py=&apos;6&apos; — 128px of vertical
          breathing room above and below. It is the band; Container is the
          column inside it.
        </Text>
      </Container>
    </Section>
  </Box>
)

export const Stacked = () => (
  <Box>
    <Section py='4' bg='gray.900'>
      <Container>
        <Text fontSize='5'>First band — py=&apos;4&apos; (32px)</Text>
      </Container>
    </Section>
    <Section py='4'>
      <Container>
        <Text fontSize='5'>Second band, no background</Text>
      </Container>
    </Section>
    <Section py='4' bg='gray.900'>
      <Container>
        <Text fontSize='5'>Third band</Text>
      </Container>
    </Section>
  </Box>
)
