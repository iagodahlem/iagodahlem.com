import React from 'react'
import { Container, Flex, Heading, Section, Seo, Text } from '../components'

const AboutPage = () => {
  return (
    <>
      <Seo title='About' />

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
            Hey there! 👋 I'm Iago. A software engineer working at Codeminer42,
            where I do consultancy for different types of companies like F. de
            São Paulo, GoDaddy and currently LiftForward. I like to mentorship
            new developers starting their careers, open source software and ways
            to improve scalability and maintainability, with good practices
            using software architecture, domain driven design, testing and that
            good stuff.
          </Text>

          <Text fontSize='6' lineHeight='3rem' mt='4' opacity='.9'>
            I'm currently living in Florianópolis, with my lovely wife 👩, our
            crazy dog Helga 🐶, and we recently had a insanely beautiful
            daughter called Ramona 👶.
          </Text>
        </Container>
      </Section>
    </>
  )
}

export default AboutPage
