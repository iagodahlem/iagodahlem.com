import { PAGE_DESCRIPTIONS, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Projects',
  description: PAGE_DESCRIPTIONS.projects,
  path: '/projects/',
})

type Project = {
  name: string
  description: string
  language: string
  githubUrl: string
  liveUrl?: string
}

/**
 * Manually curated from github.com/iagodahlem's public repos: small games,
 * canvas/audio experiments, and developer tools worth linking to. Not a
 * live API call, so this needs a hand edit whenever something new ships.
 */
const PLAYGROUND_PROJECTS: Project[] = [
  {
    name: 'clock-panel',
    description:
      'A panel of small analog clocks that display the time together, a canvas motion study.',
    language: 'TypeScript',
    githubUrl: 'https://github.com/iagodahlem/clock-panel',
    liveUrl: 'https://iagodahlem.github.io/clock-panel/',
  },
  {
    name: 'audio-lab',
    description:
      'Chat-driven multi-track audio experiments on the Web Audio API: an engine-sound rev ladder and a minimal generative mixer.',
    language: 'TypeScript',
    githubUrl: 'https://github.com/iagodahlem/audio-lab',
    liveUrl: 'https://iagodahlem.github.io/audio-lab/',
  },
  {
    name: 'knife-hit',
    description: 'A Knife Hit clone built with Phaser 3.',
    language: 'JavaScript',
    githubUrl: 'https://github.com/iagodahlem/knife-hit',
    liveUrl: 'https://iagodahlem.com/knife-hit/',
  },
  {
    name: 'stars-and-bombs',
    description: 'A simple arcade game built with Phaser 3.',
    language: 'JavaScript',
    githubUrl: 'https://github.com/iagodahlem/stars-and-bombs',
    liveUrl: 'https://iagodahlem.com/stars-and-bombs/',
  },
  {
    name: 'matrix',
    description: 'A Matrix-style digital rain effect.',
    language: 'JavaScript',
    githubUrl: 'https://github.com/iagodahlem/matrix',
    liveUrl: 'https://matrix.iagodahlem.com',
  },
  {
    name: 'drumpad',
    description: 'A drum pad built with the Web Audio API.',
    language: 'HTML',
    githubUrl: 'https://github.com/iagodahlem/drumpad',
    liveUrl: 'https://iagodahlem.com/drumpad',
  },
  {
    name: '3d-cube',
    description: 'A 3D cube built with pure CSS transforms.',
    language: 'HTML',
    githubUrl: 'https://github.com/iagodahlem/3d-cube',
    liveUrl: 'https://iagodahlem.com/3d-cube',
  },
  {
    name: 'clonepen',
    description: 'A small clone of CodePen, the online code playground.',
    language: 'JavaScript',
    githubUrl: 'https://github.com/iagodahlem/clonepen',
    liveUrl: 'https://iagodahlem.com/clonepen',
  },
  {
    name: 'calc',
    description: 'A calculator built with React and Redux.',
    language: 'JavaScript',
    githubUrl: 'https://github.com/iagodahlem/calc',
    liveUrl: 'https://iagodahlem.com/calc',
  },
  {
    name: 'cqlite',
    description: 'A small SQLite clone, written in C.',
    language: 'C',
    githubUrl: 'https://github.com/iagodahlem/cqlite',
  },
  {
    name: 'kv_umbrella',
    description: 'A distributed key-value store, written in Elixir.',
    language: 'Elixir',
    githubUrl: 'https://github.com/iagodahlem/kv_umbrella',
  },
  {
    name: 'lisp-to-c-compiler',
    description:
      'A small Lisp-to-C compiler, built to learn how compilers work.',
    language: 'JavaScript',
    githubUrl: 'https://github.com/iagodahlem/lisp-to-c-compiler',
  },
  {
    name: 'rydux',
    description: 'A small Redux implementation, ported to Ruby.',
    language: 'Ruby',
    githubUrl: 'https://github.com/iagodahlem/rydux',
  },
]

const TOOLS_PROJECTS: Project[] = [
  {
    name: 'domainproof',
    description: 'An API-first product for proving ownership of a domain.',
    language: 'TypeScript',
    githubUrl: 'https://github.com/iagodahlem/domainproof',
    liveUrl: 'https://domainproof.dev',
  },
  {
    name: 'straper',
    description:
      'A CLI that scaffolds AI agent workspaces and manages their skills through a versioned registry.',
    language: 'Shell',
    githubUrl: 'https://github.com/iagodahlem/straper',
  },
  {
    name: 'flokit',
    description: 'A toolkit for building smooth, animated UIs with React.',
    language: 'JavaScript',
    githubUrl: 'https://github.com/iagodahlem/flokit',
    liveUrl: 'https://flokit.iagodahlem.com/',
  },
  {
    name: 'tiempo',
    description: 'A Pomodoro app for the modern web.',
    language: 'JavaScript',
    githubUrl: 'https://github.com/iagodahlem/tiempo',
    liveUrl: 'https://tiempo.iagodahlem.com',
  },
  {
    name: 'roll.js',
    description: 'A small, dependency-free scroll-to-top utility.',
    language: 'JavaScript',
    githubUrl: 'https://github.com/iagodahlem/roll.js',
    liveUrl: 'https://iagodahlem.github.io/roll.js/',
  },
  {
    name: 'cerebro-translate',
    description:
      'A Cerebro plugin for translating text with the Google Translate API.',
    language: 'JavaScript',
    githubUrl: 'https://github.com/iagodahlem/cerebro-translate',
  },
  {
    name: 'clima-cli',
    description: 'A simple CLI that shows the weather.',
    language: 'JavaScript',
    githubUrl: 'https://github.com/iagodahlem/clima-cli',
  },
]

function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className='mt-6 flex flex-col gap-8'>
      {projects.map((project) => (
        <div key={project.name}>
          <p className='font-body text-[21px] font-semibold'>{project.name}</p>

          <p className='text-subtle'>
            <em>{project.description}</em>
          </p>

          <p className='mt-1 text-base text-subtle'>{project.language}</p>

          <ul className='mt-2 flex flex-col gap-1'>
            <li>
              <a
                href={project.githubUrl}
                target='_blank'
                rel='noreferrer'
                className='link-fade text-subtle underline'
              >
                <em>GitHub</em>
              </a>
            </li>

            {project.liveUrl && (
              <li>
                <a
                  href={project.liveUrl}
                  target='_blank'
                  rel='noreferrer'
                  className='link-fade text-subtle underline'
                >
                  <em>Live</em>
                </a>
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <div className='mx-auto max-w-[40rem] px-8 py-32'>
      <h1 className='font-heading text-[37px] font-bold'>Projects</h1>

      <h2 className='mt-8 font-heading text-[28px] font-bold'>Playground</h2>
      <ProjectList projects={PLAYGROUND_PROJECTS} />

      <h2 className='mt-16 font-heading text-[28px] font-bold'>
        Tools &amp; Sites
      </h2>
      <ProjectList projects={TOOLS_PROJECTS} />
    </div>
  )
}
