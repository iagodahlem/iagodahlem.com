import React from 'react'
import { format, intervalToDuration, formatDuration } from 'date-fns'
import css from '@styled-system/css'
import { motion } from 'framer-motion'
import {
  Box,
  Container,
  Flex,
  Heading,
  Section,
  Seo,
  Text,
} from '../components'

const jobs = [
  {
    jobTitle: 'Senior Software Engineer',
    jobType: 'Full-time',
    companyName: 'Clerk.com',
    companyUrl: 'https://clerk.com',
    startDate: new Date('Jan, 07, 2025'),
    endDate: null,
  },
  {
    jobTitle: 'Software Engineer',
    jobType: 'Full-time',
    companyName: 'StickerMule',
    companyUrl: 'https://stickermule.com',
    startDate: new Date('Dec, 05, 2022'),
    endDate: new Date('Jan, 03, 2025'),
  },
  {
    jobTitle: 'Software Engineer',
    jobType: 'Full-time',
    companyName: 'Codeminer42',
    companyUrl: 'https://codeminer42.com',
    startDate: new Date('May, 2017'),
    endDate: new Date('Dec, 02, 2022'),
  },
  {
    jobTitle: 'Software Engineer',
    jobType: 'Contractor',
    companyName: 'StackCommerce',
    companyUrl: 'https://www.stackcommerce.com',
    startDate: new Date('May, 2022'),
    endDate: new Date('Dec, 2022'),
  },
  {
    jobTitle: 'Software Engineer',
    jobType: 'Contractor',
    companyName: '9Count',
    companyUrl: 'https://9count.co',
    startDate: new Date('Feb, 2022'),
    endDate: new Date('May, 2022'),
  },
  {
    jobTitle: 'Software Engineer',
    jobType: 'Contractor',
    companyName: 'LiftForward',
    companyUrl: 'https://liftforward.com',
    startDate: new Date('October, 2021'),
    endDate: new Date('Feb, 2022'),
  },
  {
    jobTitle: 'Software Engineer',
    jobType: 'Contractor',
    companyName: 'Edlio',
    companyUrl: 'https://edlio.com',
    startDate: new Date('May, 2021'),
    endDate: new Date('September, 2021'),
  },
  {
    jobTitle: 'Software Engineer',
    jobType: 'Contractor',
    companyName: 'GoDaddy',
    companyUrl: 'https://godaddy.com',
    startDate: new Date('January, 2018'),
    endDate: new Date('May, 2021'),
  },
  {
    jobTitle: 'Front-End Engineer',
    jobType: 'Contractor',
    companyName: 'Folha de S.Paulo',
    companyUrl: 'https://folha.uol.com.br',
    startDate: new Date('July, 2017'),
    endDate: new Date('December, 2017'),
  },
  {
    jobTitle: 'Software Engineer',
    jobType: 'Full-time',
    companyName: 'CWI Software',
    companyUrl: 'https://cwi.com.br',
    startDate: new Date('September, 2015'),
    endDate: new Date('May, 2017'),
  },
]

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
          <Heading as='h2' fontFamily='heading' fontSize='8' mb='5'>
            About Me
          </Heading>

          <Box color='gray.200'>
            <Text lineHeight='3.2rem'>
              Hey there! 👋, I'm Iago. A software engineer from Brazil. I'm
              currently working at Clerk.com.
            </Text>

            <Text lineHeight='3.2rem' mt='4'>
              I live in Florianópolis with my lovely wife 👩, our crazy dog
              Helga 🐶, and we recently had a insanely beautiful daughter called
              Ramona 👶.
            </Text>

            <Text lineHeight='3.2rem' mt='4'>
              I like to study good practices and architectures to improve
              software scalability and maintainability.
            </Text>

            <Text lineHeight='3.2rem' mt='4'>
              When I'm not working, you can find me playing with my daughter or
              trying to play video games when she let's me, cooking some food
              for my family, I love Sunday BBQs 🍖, listening to music 🎵 or
              fixing some stuff around the house.
            </Text>
          </Box>

          <Heading as='h3' fontFamily='heading' fontSize='7' mt='5'>
            Experience
          </Heading>

          <Box mt='4'>
            {jobs.map((job) => {
              const startDate = format(job.startDate, 'LLL, yyyy')
              const endDate = job.endDate
                ? format(job.endDate, 'LLL, yyyy')
                : 'Present'

              const durationObj = intervalToDuration({
                start: job.startDate,
                end: job.endDate ?? new Date(),
              })

              const durationFormat = durationObj.months
                ? ['years', 'months']
                : ['days']

              const duration = formatDuration(durationObj, {
                format: durationFormat,
              })

              return (
                <Box
                  key={`${job.jobTitle}-${job.companyName}`}
                  css={css({ ':not(:last-child)': { mb: '4' } })}
                >
                  <Text
                    as={motion.a}
                    href={job.companyUrl}
                    whileHover={{ opacity: 0.6 }}
                    fontWeight='600'
                    lineHeight='3.2rem'
                  >
                    {job.companyName}
                  </Text>

                  <Text lineHeight='3.2rem'>
                    {job.jobTitle} •{' '}
                    <Text as='span' color='gray.300'>
                      {job.jobType}
                    </Text>
                  </Text>

                  <Text fontSize='1.4rem' lineHeight='3.2rem' color='gray.300'>
                    {startDate} &#8212; {endDate} • {duration}
                  </Text>
                </Box>
              )
            })}
          </Box>
        </Container>
      </Section>
    </>
  )
}

export default AboutPage
