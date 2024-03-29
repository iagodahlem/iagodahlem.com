import React from 'react'
import { Text, Section, Container, Flex, Heading, Seo } from '../components'

const NotFoundPage = (props) => (
  <>
    <Seo
      title='Page not Found'
      description="This route doesn't exist."
      pathname={props.location.pathname}
    />

    <Section>
      <Container
        as={Flex}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Heading as='h2' mb='5' fontFamily='heading' fontSize='10'>
          404
        </Heading>

        <Text fontSize='6'>
          You just hit a route that doesn't exist... the sadness.
        </Text>
      </Container>
    </Section>
  </>
)

export default NotFoundPage
