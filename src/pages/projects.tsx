import React from 'react'
import css from '@styled-system/css'
import {
  Box,
  Container,
  Flex,
  Heading,
  ProjectCard,
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
  <Box
    css={css({
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '24px',
      '@media (min-width: 56rem)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    })}
  >
    {projects.map((project, index) => (
      <ProjectCard key={project.name} project={project} index={index} />
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
          maxWidth='960px'
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
