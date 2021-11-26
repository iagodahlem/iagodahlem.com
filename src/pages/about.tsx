import React from 'react'
import { Container, Box, Flex, Text, Heading, Section } from '../components'

const AboutPage = () => {
  return (
    <Section>
      <Container
        as={Flex}
        flexDirection='column'
        justifyContent='center'
        alignItems='flex-start'
      >
        <Heading as='h2' fontFamily='heading' fontSize='7' mb='5'>
          About Me
        </Heading>

        <Text fontSize='6' lineHeight='3rem' opacity='.9'>
          Hey there! I'm Iago. a software engineer working at Codeminer42, where
          I give consultancy for different types of companies like F. de São
          Paulo, GoDaddy and currently LiftForward. I also like helping to
          mentorship new developers and open source software.
        </Text>

        <Text fontSize='6' lineHeight='3rem' mt='4' opacity='.9'>
          I'm currently living in Florianópolis, with my lovely wife, our crazy
          dog Helga and we recently had a insanely beautiful daughter.
        </Text>
      </Container>
    </Section>
  )
}

export default AboutPage
