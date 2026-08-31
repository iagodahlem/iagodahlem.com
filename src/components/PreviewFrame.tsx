import React, { useEffect, useRef, useState } from 'react'
import css from '@styled-system/css'
import Box from './Box'

const PREVIEW_WIDTH = 1280
const PREVIEW_HEIGHT = 800

const SANDBOX = 'allow-scripts allow-same-origin allow-popups allow-forms'

const PreviewFrame = ({ src, title }: { src: string; title: string }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const updateScale = () => {
      if (wrapperRef.current) {
        setScale(wrapperRef.current.clientWidth / PREVIEW_WIDTH)
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return (
    <Box
      ref={wrapperRef}
      position='relative'
      width='100%'
      overflow='hidden'
      css={css({ aspectRatio: '16 / 10' })}
    >
      {scale > 0 && (
        <Box
          as='iframe'
          src={src}
          title={title}
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
