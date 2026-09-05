import React, { FC } from 'react'
import { format, intervalToDuration, formatDuration } from 'date-fns'
import css from '@styled-system/css'
import { motion } from 'framer-motion'
import { Box, Heading, Text } from '../components'

export const jobs = [
  {
    jobTitle: 'Senior Software Engineer',
    jobType: 'Full-time',
    companyName: 'Clerk.com',
    companyUrl: 'https://clerk.com',
    startDate: new Date('Jan, 07, 2025'),
    endDate: new Date('July, 09, 2026'),
    stack: 'React · TypeScript · Go',
    detail:
      'B2B side of the authentication platform: organizations, SSO & enterprise connections (SAML/OIDC), SCIM directory sync, roles & permissions.',
  },
  {
    jobTitle: 'Senior Software Engineer',
    jobType: 'Full-time',
    companyName: 'StickerMule',
    companyUrl: 'https://stickermule.com',
    startDate: new Date('Dec, 05, 2022'),
    endDate: new Date('Jan, 03, 2025'),
    stack: 'Ruby on Rails · Node.js',
    detail:
      'Backend on the Finances then Platform teams: order management, and migrating the legacy Rails monolith to Node microservices.',
  },
  {
    jobTitle: 'Senior Software Engineer',
    jobType: 'Full-time',
    companyName: 'Codeminer42',
    companyUrl: 'https://codeminer42.com',
    startDate: new Date('May, 2017'),
    endDate: new Date('Dec, 02, 2022'),
    stack: 'React · Node · Ruby',
    detail:
      'Full-stack consulting for international clients: GoDaddy, StackCommerce, Edlio, LiftForward, 9Count, Folha de S.Paulo.',
  },
  {
    jobTitle: 'Software Engineer',
    jobType: 'Full-time',
    companyName: 'CWI Software',
    companyUrl: 'https://cwi.com.br',
    startDate: new Date('September, 2015'),
    endDate: new Date('May, 2017'),
    stack: 'Java · Angular · Oracle · Sass',
    detail:
      'Frontend for a health-insurance company, building most of the UI for their new applications.',
  },
]

type Props = {
  personal?: boolean
  compact?: boolean
}

// `compact` tightens the fixed 3.2rem line-height used throughout this file.
// It's the one hand-picked value the printer theme's proportional font/space
// scaling (see theme.ts) can't reach, since it's a literal CSS value rather
// than a theme lookup. Only resume.tsx passes compact — the /about page keeps
// the normal, more relaxed spacing.
const lineHeightFor = (compact?: boolean) => (compact ? '2.2rem' : '3.2rem')

export const AboutMe: FC<Props> = ({ personal = true, compact = false }) => {
  const lineHeight = lineHeightFor(compact)

  return (
    <>
      <Heading as='h2' fontFamily='heading' fontSize='8' mb='5'>
        About Me
      </Heading>

      <Box color='gray.200'>
        <Text lineHeight={lineHeight}>
          Hey there! 👋 I'm Iago — a software engineer from Brazil. I build
          products end to end: frontend-first, but happy to follow a problem
          into the backend, the database, or the design file.
        </Text>

        <Text lineHeight={lineHeight} mt='4'>
          For about a year and a half I was a Senior Software Engineer at Clerk,
          working on the B2B side of the authentication platform. I worked
          across the stack, React and TypeScript in the dashboard and Go on the
          backend, on organizations, SSO and enterprise connections (SAML and
          OIDC), SCIM directory sync, and roles & permissions.
        </Text>

        <Text lineHeight={lineHeight} mt='4'>
          Before Clerk I was at Sticker Mule, and spent five years at
          Codeminer42 consulting for teams like GoDaddy, StackCommerce, and
          Folha de S.Paulo. The way I like to work: ship in small, well-tested
          increments, sweat the corner cases, and keep software maintainable as
          it grows.
        </Text>

        {personal && (
          <Text lineHeight={lineHeight} mt='4'>
            I live in Florianópolis with my wife 👩, our crazy dog Helga 🐶, and
            our daughter Ramona 👶. When I'm not working you'll find me playing
            with Ramona, sneaking in a video game when she lets me, cooking for
            the family (Sunday BBQ 🍖 is sacred), or fixing something around the
            house.
          </Text>
        )}

        {personal && (
          <Text lineHeight={lineHeight} mt='4'>
            I'm currently looking for a new role. If you're building something
            interesting,{' '}
            <Text
              as={motion.a}
              href='mailto:iagodahlemlorensini@gmail.com'
              whileHover={{ opacity: 0.6 }}
              fontWeight='600'
            >
              say hi
            </Text>
            .
          </Text>
        )}
      </Box>
    </>
  )
}

export const Experience: FC<{ compact?: boolean }> = ({ compact = false }) => {
  const lineHeight = lineHeightFor(compact)

  return (
    <>
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

          const durationFormat =
            durationObj.years || durationObj.months
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
                lineHeight={lineHeight}
              >
                {job.companyName}
              </Text>

              <Text lineHeight={lineHeight}>
                {job.jobTitle} •{' '}
                <Text as='span' color='gray.300'>
                  {job.jobType}
                </Text>
              </Text>

              <Text fontSize='1.4rem' lineHeight={lineHeight} color='gray.300'>
                {startDate} &#8212; {endDate} • {duration}
              </Text>

              {job.detail && <Text lineHeight={lineHeight}>{job.detail}</Text>}
              {job.stack && (
                <Text
                  fontSize='1.4rem'
                  lineHeight={lineHeight}
                  color='gray.300'
                >
                  {job.stack}
                </Text>
              )}
            </Box>
          )
        })}
      </Box>
    </>
  )
}
