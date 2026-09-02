// Compile the design system to dist/ with the repo's OWN Babel transform.
//
// Why this exists: the components style themselves two ways — styled-system
// props (color, fontSize, px…) and the styled-components `css` prop
// (css={css({ borderRadius: '10px', gap: '12px' })}). The `css` prop is not a
// runtime feature: babel-plugin-styled-components rewrites it at build time,
// which Gatsby does for the site via gatsby-plugin-styled-components. The
// design-sync converter bundles with esbuild, which runs no Babel — so
// bundling src/ directly silently drops every css={} rule (cards lose their
// borders, gaps, chips and aspect ratios) while styled-system props keep
// working, which makes the damage easy to miss.
//
// This pass runs babel-plugin-styled-components (already a dependency) over
// the design system's sources first, so the converter bundles code whose css
// props are already real styled-components.
//
// The output mirrors repo-relative paths under dist/ (src/foo.tsx ->
// dist/src/foo.js, .design-sync/entry.tsx -> dist/.design-sync/entry.js) so
// every relative import in the sources resolves unchanged, with no rewriting.
//
// Usage: node .design-sync/build-dist.mjs   (run from the repo root)
import { transformFileAsync } from '@babel/core'
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative } from 'node:path'

const OUT = 'dist'
const SOURCES = ['src/components', 'src/theme.ts', '.design-sync/entry.tsx']
const EXT = /\.(tsx|ts|jsx|js)$/

function walk(p, acc = []) {
  if (statSync(p).isDirectory()) {
    for (const e of readdirSync(p)) walk(join(p, e), acc)
  } else if (EXT.test(p)) {
    acc.push(p)
  }
  return acc
}

rmSync(OUT, { recursive: true, force: true })
const files = SOURCES.flatMap((s) => walk(s))
let n = 0
for (const file of files) {
  const res = await transformFileAsync(file, {
    babelrc: false,
    configFile: false,
    sourceType: 'module',
    presets: [
      // isTSX/allExtensions are per-file — .ts must not be parsed as TSX
      // (`<T>` would read as a JSX element), .tsx must.
      [
        '@babel/preset-typescript',
        file.endsWith('.tsx')
          ? { isTSX: true, allExtensions: true }
          : { isTSX: false, allExtensions: true },
      ],
      // Automatic runtime: several components import no React binding, so a
      // classic React.createElement output would be undefined at runtime.
      // The converter externalises react/jsx-runtime to window.React.
      ['@babel/preset-react', { runtime: 'automatic', development: true }],
    ],
    // The whole point of this pass. ssr/displayName keep class names stable
    // and readable; pure lets esbuild drop unused components.
    plugins: [
      ['babel-plugin-styled-components', { cssProp: true, ssr: true, displayName: true, pure: true }],
    ],
    // Modules stay ESM so esbuild can bundle and tree-shake.
  })
  const dest = join(OUT, relative('.', file)).replace(EXT, '.js')
  mkdirSync(dirname(dest), { recursive: true })
  writeFileSync(dest, res.code + '\n')
  n++
}
console.error(`built ${n} file(s) -> ${OUT}/ (css prop transformed by babel-plugin-styled-components)`)
