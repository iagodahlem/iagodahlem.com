import React from 'react'
import { Container, Flex, Text, Heading, Section, Seo } from '../components'

const TalksPage = () => {
  return (
    <>
      <Seo title='Talks' />

      <Section>
        <Container
          as={Flex}
          flexDirection='column'
          justifyContent='center'
          alignItems='flex-start'
        >
          <Heading as='h2' fontFamily='heading' fontSize='7' mb='5'>
            Talks
          </Heading>

          <Text fontSize='6' lineHeight='3rem' color='gray.200'>
            Coming...
          </Text>
        </Container>
      </Section>
    </>
  )
}

export default TalksPage
