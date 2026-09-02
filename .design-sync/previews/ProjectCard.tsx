import React from 'react'
import { Box, ProjectCard } from 'iagodahlem-com'

// Content is taken verbatim from src/data/projects.json so the cards show the
// real thing. Cells use embeddable:false variants — the 'live' state mounts a
// sandboxed iframe against the public internet, which is not statically
// renderable (see PreviewFrame for that state).
const clockPanel = {
  name: 'clock-panel',
  description:
    'A panel of small analog clocks that display the time together, a canvas motion study.',
  language: 'TypeScript',
  github: 'https://github.com/iagodahlem/clock-panel',
  live: 'https://clock-panel.vercel.app/',
}

const audioLab = {
  name: 'audio-lab',
  description:
    'Chat-driven multi-track audio experiments on the Web Audio API: an engine-sound rev ladder and a minimal generative mixer.',
  language: 'TypeScript',
  github: 'https://github.com/iagodahlem/audio-lab',
  live: 'https://iagodahlem.github.io/audio-lab/',
}

const knifeHit = {
  name: 'knife-hit',
  description: 'A Knife Hit clone built with Phaser 3.',
  language: 'JavaScript',
  github: 'https://github.com/iagodahlem/knife-hit',
}

// Solo cards are capped at the width one column of the real two-column grid
// gets — a full-bleed card stretches the 16/10 plate out of all proportion.
export const LinkDown = () => (
  <Box maxWidth='460px'>
    <ProjectCard project={clockPanel} />
  </Box>
)

export const NoLiveDemo = () => (
  <Box maxWidth='460px'>
    <ProjectCard project={knifeHit} />
  </Box>
)

// The two-column grid src/pages/projects.tsx lays these out in.
export const Grid = () => (
  <Box
    display='grid'
    style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}
  >
    <ProjectCard project={clockPanel} />
    <ProjectCard project={audioLab} />
  </Box>
)
