import React from 'react'
import { Container, Flex, Section, Seo } from '../components'
import { AboutMe, Experience } from '../content/about'

const AboutPage = (props) => {
  return (
    <>
      <Seo
        title='About'
        description='About Me'
        pathname={props.location.pathname}
      />

      <Section>
        <Container
          as={Flex}
          flexDirection='column'
          justifyContent='center'
          alignItems='flex-start'
        >
          <AboutMe />

          <Experience />
        </Container>
      </Section>
    </>
  )
}

export default AboutPage
