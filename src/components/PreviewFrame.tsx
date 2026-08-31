import React, { useEffect, useRef, useState } from 'react'
import css from '@styled-system/css'
import Box from './Box'
import Flex from './Flex'
import Text from './Text'

const PREVIEW_WIDTH = 1280
const PREVIEW_HEIGHT = 800
const ASPECT_RATIO = '16 / 10'

const SANDBOX = 'allow-scripts allow-same-origin allow-popups allow-forms'

type PreviewFrameProps =
  | { state: 'live'; src: string; title: string }
  | { state: 'down' | 'none'; title: string; language: string; note: string }

// Flush inside ProjectCard: the card's own border wraps this on all sides,
// so this owns no border of its own, only the backdrop behind the iframe
// or placeholder plate.
const PreviewFrame = (props: PreviewFrameProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    if (props.state !== 'live') return

    const updateScale = () => {
      if (wrapperRef.current) {
        setScale(wrapperRef.current.clientWidth / PREVIEW_WIDTH)
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [props.state])

  if (props.state !== 'live') {
    return (
      <Flex
        width='100%'
        alignItems='center'
        justifyContent='center'
        css={css({
          aspectRatio: ASPECT_RATIO,
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          backgroundImage:
            'repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.05) 0, rgba(255, 255, 255, 0.05) 1px, transparent 1px, transparent 10px)',
        })}
      >
        <Flex
          flexDirection='column'
          alignItems='center'
          css={css({ gap: '8px' })}
        >
          <Text
            fontSize='3'
            fontWeight='3'
            color='gray.500'
            css={css({
              fontFamily: 'monospace',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '6px',
              padding: '4px 10px',
              letterSpacing: '0.03em',
            })}
          >
            {props.language}
          </Text>
          <Text fontSize='2' color='gray.600'>
            {props.note}
          </Text>
        </Flex>
      </Flex>
    )
  }

  return (
    <Box
      ref={wrapperRef}
      position='relative'
      width='100%'
      overflow='hidden'
      css={css({
        aspectRatio: ASPECT_RATIO,
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
      })}
    >
      {scale > 0 && (
        <Box
          as='iframe'
          src={props.src}
          title={props.title}
          loading='lazy'
          sandbox={SANDBOX}
          width={`${PREVIEW_WIDTH}px`}
          height={`${PREVIEW_HEIGHT}px`}
          position='absolute'
          top='0'
          left='0'
          border='0'
          css={css({
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          })}
        />
      )}
    </Box>
  )
}

export default PreviewFrame
