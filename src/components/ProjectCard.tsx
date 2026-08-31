import React from 'react'
import { motion } from 'framer-motion'
import css from '@styled-system/css'
import Box from './Box'
import Flex from './Flex'
import Text from './Text'
import Heading from './Heading'
import PreviewFrame from './PreviewFrame'

type Project = {
  name: string
  description: string
  language: string
  github: string
  live?: string
  embeddable?: boolean
}

// Card without a live preview: still has a `live` URL means it's currently
// down (round 2 found drumpad/3d-cube 404ing), no `live` at all means there
// never was a demo.
const previewFallback = (project: Project) =>
  project.live
    ? { language: project.language, note: 'Link is down' }
    : { language: project.language, note: 'No live demo' }

const ProjectCard = ({ project }: { project: Project }) => {
  const hasPreview = Boolean(project.live && project.embeddable)
  const isLive = Boolean(project.live && project.embeddable)

  return (
    <Box
      as='article'
      display='flex'
      flexDirection='column'
      overflow='hidden'
      width='100%'
      css={css({
        borderRadius: '10px',
        border: '1px solid',
        borderColor: 'gray.300',
        transition: 'border-color 200ms ease',
        '&:hover': {
          borderColor: 'black',
        },
      })}
    >
      {hasPreview ? (
        <PreviewFrame
          state='live'
          src={project.live as string}
          title={project.name}
        />
      ) : (
        <PreviewFrame
          state={project.live ? 'down' : 'none'}
          title={project.name}
          {...previewFallback(project)}
        />
      )}

      <Flex
        flexDirection='column'
        flex='1'
        px='4'
        py='4'
        css={css({ gap: '12px' })}
      >
        <Heading
          as='h3'
          m='0'
          fontSize='5'
          fontWeight='3'
          css={css({ fontFamily: 'monospace' })}
        >
          {project.name}
        </Heading>

        <Text
          fontSize='4'
          color='gray.300'
          css={css({ maxWidth: '52ch', lineHeight: 1.4 })}
        >
          {project.description}
        </Text>

        <Flex alignItems='center' mt='auto' pt='2' css={css({ gap: '16px' })}>
          {isLive && (
            <Text
              as={motion.a}
              href={project.live}
              target='_blank'
              rel='noreferrer'
              fontSize='5'
              fontWeight='3'
              whileHover={{ opacity: 0.6 }}
              css={css({
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              })}
            >
              Open live <span aria-hidden='true'>↗</span>
            </Text>
          )}
          <Text
            as={motion.a}
            href={project.github}
            target='_blank'
            rel='noreferrer'
            fontSize='5'
            fontWeight='3'
            whileHover={{ opacity: 0.6 }}
            css={css({
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            })}
          >
            Source <span aria-hidden='true'>↗</span>
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default ProjectCard
