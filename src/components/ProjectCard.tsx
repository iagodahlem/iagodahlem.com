import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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

const STAGGER_MS = 45
const STAGGER_ROW_SIZE = 6

// Card without a live preview: still has a `live` URL means it's currently
// down (round 2 found drumpad/3d-cube 404ing), no `live` at all means there
// never was a demo.
const previewFallback = (project: Project) =>
  project.live
    ? { language: project.language, note: 'Link is down' }
    : { language: project.language, note: 'No live demo' }

const ProjectCard = ({
  project,
  index,
}: {
  project: Project
  index: number
}) => {
  const shouldReduceMotion = useReducedMotion()
  const hasPreview = Boolean(project.live && project.embeddable)
  const isLive = Boolean(project.live && project.embeddable)

  return (
    <Box
      as={motion.article}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -8% 0px' }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : 0.32,
        delay: shouldReduceMotion
          ? 0
          : (index % STAGGER_ROW_SIZE) * (STAGGER_MS / 1000),
        ease: [0.16, 1, 0.3, 1],
      }}
      display='flex'
      flexDirection='column'
      overflow='hidden'
      width='100%'
      css={css({
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
        transition: 'border-color 200ms ease, box-shadow 200ms ease',
        '&:hover': {
          borderColor: 'rgba(255, 255, 255, 0.28)',
          boxShadow: '0 20px 36px -16px rgba(0, 0, 0, 0.55)',
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
        <Flex alignItems='center' css={css({ gap: '10px' })}>
          {isLive && (
            <>
              <Box
                aria-hidden='true'
                css={css({
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#3ecf6e',
                  flexShrink: 0,
                })}
              />
              <Text
                as='span'
                css={css({
                  position: 'absolute',
                  width: '1px',
                  height: '1px',
                  padding: 0,
                  margin: '-1px',
                  overflow: 'hidden',
                  clip: 'rect(0, 0, 0, 0)',
                  whiteSpace: 'nowrap',
                  border: 0,
                })}
              >
                Live —{' '}
              </Text>
            </>
          )}
          <Heading
            as='h3'
            m='0'
            fontSize='5'
            fontWeight='3'
            css={css({ fontFamily: 'monospace' })}
          >
            {project.name}
          </Heading>
        </Flex>

        <Text
          fontSize='4'
          color='gray.300'
          css={css({ maxWidth: '52ch', lineHeight: 1.4 })}
        >
          {project.description}
        </Text>

        <Flex alignItems='center' mt='auto' pt='2' css={css({ gap: '12px' })}>
          <Text
            as='span'
            fontSize='2'
            fontWeight='3'
            color='gray.400'
            css={css({
              fontFamily: 'monospace',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '6px',
              padding: '2px 8px',
            })}
          >
            {project.language}
          </Text>

          <Flex ml='auto' css={css({ gap: '16px' })}>
            {isLive && (
              <Text
                as={motion.a}
                href={project.live}
                target='_blank'
                rel='noreferrer'
                fontSize='3'
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
              fontSize='3'
              fontWeight='3'
              color='gray.400'
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
      </Flex>
    </Box>
  )
}

export default ProjectCard
