import React from 'react'
import css from '@styled-system/css'
import { motion } from 'framer-motion'
import {
  Box,
  Container,
  Flex,
  Text,
  Heading,
  Section,
  Seo,
} from '../components'

const talks = [
  {
    title: 'Decoupling from the State Layer',
    description: 'Custom hooks to the rescue!',
    slidesUrl: 'https://talks.iagodahlem.com/decoupling-from-the-state-layer/',
    videoUrl: 'https://www.youtube.com/watch?v=q8Sns0mFoUE',
  },
  {
    title: 'Architecting Rails Apps',
    description: '',
    slidesUrl: 'https://talks.iagodahlem.com/architecting-rails-apps/',
    videoUrl: '',
  },
]

const TalksPage = (props) => {
  return (
    <>
      <Seo title='Talks' pathname={props.location.pathname} />

      <Section>
        <Container
          as={Flex}
          flexDirection='column'
          justifyContent='center'
          alignItems='flex-start'
        >
          <Heading as='h2' fontFamily='heading' fontSize='8' mb='5'>
            Talks
          </Heading>

          {talks.map((talk) => (
            <Box
              key={talk.title}
              css={css({ ':not(:last-child)': { mb: '4' } })}
            >
              <Text fontSize='6' fontWeight='3' lineHeight='3.2rem'>
                {talk.title}
              </Text>

              {talk.description && (
                <Text lineHeight='3.2rem' color='gray.300'>
                  <em>{talk.description}</em>
                </Text>
              )}

              <Box as='ul' m='0' mt='2'>
                {talk.videoUrl && (
                  <Box as='li'>
                    <Text
                      as={motion.a}
                      href={talk.videoUrl}
                      whileHover={{ opacity: 0.6 }}
                      color='gray.300'
                      css={css({ textDecoration: 'underline' })}
                    >
                      <em>Video</em>
                    </Text>
                  </Box>
                )}

                <Box as='li'>
                  <Text
                    as={motion.a}
                    href={talk.slidesUrl}
                    whileHover={{ opacity: 0.6 }}
                    color='gray.300'
                    css={css({ textDecoration: 'underline' })}
                  >
                    <em>Slides</em>
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Container>
      </Section>
    </>
  )
}

export default TalksPage
