import React from 'react'
import css from '@styled-system/css'
import { motion } from 'framer-motion'
import {
  Box,
  Container,
  Flex,
  Text,
  Heading,
  PreviewFrame,
  Section,
  Seo,
} from '../components'
import projects from '../data/projects.json'

type Project = {
  name: string
  description: string
  language: string
  github?: string
  live?: string
  section: 'playground' | 'tools'
  featured: boolean
  embeddable?: boolean
}

const typedProjects = (projects as Project[]).filter((p) => p.featured)

const sections = [
  { key: 'playground', title: 'Playground' },
  { key: 'tools', title: 'Tools & Sites' },
] as const

const ProjectList = ({ projects }: { projects: Project[] }) => (
  <Box>
    {projects.map((project) => (
      <Box key={project.name} css={css({ ':not(:last-child)': { mb: '4' } })}>
        {project.live && project.embeddable && (
          <Box mb='3'>
            <PreviewFrame src={project.live} title={project.name} />
          </Box>
        )}

        <Text fontSize='6' fontWeight='3' lineHeight='3.2rem'>
          {project.name}
        </Text>

        <Text lineHeight='3.2rem' color='gray.300'>
          <em>{project.description}</em>
        </Text>

        <Text color='gray.300'>{project.language}</Text>

        <Box as='ul' m='0' mt='2'>
          <Box as='li'>
            <Text
              as={motion.a}
              href={project.github}
              target='_blank'
              rel='noreferrer'
              whileHover={{ opacity: 0.6 }}
              color='gray.300'
              css={css({ textDecoration: 'underline' })}
            >
              <em>GitHub</em>
            </Text>
          </Box>

          {project.live && (
            <Box as='li'>
              <Text
                as={motion.a}
                href={project.live}
                target='_blank'
                rel='noreferrer'
                whileHover={{ opacity: 0.6 }}
                color='gray.300'
                css={css({ textDecoration: 'underline' })}
              >
                <em>Live</em>
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    ))}
  </Box>
)

const ProjectsPage = (props) => {
  return (
    <>
      <Seo title='Projects' pathname={props.location.pathname} />

      <Section>
        <Container
          as={Flex}
          flexDirection='column'
          justifyContent='center'
          alignItems='flex-start'
        >
          <Heading as='h2' fontFamily='heading' fontSize='8' mb='5'>
            Projects
          </Heading>

          {sections.map(({ key, title }) => (
            <Box
              key={key}
              width='100%'
              css={css({ ':not(:last-child)': { mb: '6' } })}
            >
              <Heading as='h3' fontFamily='heading' fontSize='7' mb='4'>
                {title}
              </Heading>

              <ProjectList
                projects={typedProjects.filter((p) => p.section === key)}
              />
            </Box>
          ))}
        </Container>
      </Section>
    </>
  )
}

export default ProjectsPage
