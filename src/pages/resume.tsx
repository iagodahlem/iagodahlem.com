import React from 'react'
import { Container, Flex, Heading, Section, Seo, Text } from '../components'
import { AboutMe, Experience } from '../content/about'

const ResumePage = (props) => {
  return (
    <>
      <Seo
        title='Resume'
        description='Resume'
        pathname={props.location.pathname}
      />

      <Section>
        <Container
          as={Flex}
          flexDirection='column'
          justifyContent='center'
          alignItems='flex-start'
          maxWidth='780px'
        >
          <Heading
            as='h1'
            fontFamily='heading'
            fontSize='9'
            textAlign='center'
            textTransform='uppercase'
            mb='2'
          >
            Iago Dahlem Lorensini
          </Heading>

          <Text
            width='100%'
            fontSize='7'
            color='gray.200'
            textAlign='center'
            mb='6'
          >
            Software Engineer
          </Text>

          <AboutMe />

          <Experience />
        </Container>
      </Section>
    </>
  )
}

export default ResumePage
