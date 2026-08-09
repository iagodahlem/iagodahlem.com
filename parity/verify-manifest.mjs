#!/usr/bin/env node
// Asserts that every URL in parity/manifest.json exists as a static page in
// the `next build` (output: 'export') output directory, with a matching
// <title>. Run after `next build`:
//
//   npm run build && npm run verify:parity

import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(rootDir, '..')
const outDir = path.resolve(repoRoot, process.argv[2] ?? 'out')

const manifestPath = path.join(rootDir, 'manifest.json')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))

function pageFilePath(urlPath) {
  // trailingSlash:true export layout: "/" -> index.html,
  // "/blog/" -> blog/index.html, "/blog/foo/" -> blog/foo/index.html
  const trimmed = urlPath.replace(/^\/|\/$/g, '')
  return trimmed === ''
    ? path.join(outDir, 'index.html')
    : path.join(outDir, trimmed, 'index.html')
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>(.*?)<\/title>/s)
  return match ? match[1].trim() : null
}

if (!existsSync(outDir)) {
  console.error(
    `Build output not found at ${outDir}. Run "npm run build" first.`
  )
  process.exit(1)
}

let failures = 0

for (const page of manifest.pages) {
  const filePath = pageFilePath(page.path)

  if (!existsSync(filePath)) {
    console.error(`FAIL  ${page.path}  -- missing (expected ${path.relative(repoRoot, filePath)})`)
    failures += 1
    continue
  }

  const html = readFileSync(filePath, 'utf8')
  const title = extractTitle(html)

  if (title !== page.title) {
    console.error(
      `FAIL  ${page.path}  -- title mismatch\n      expected: ${page.title}\n      found:    ${title}`
    )
    failures += 1
    continue
  }

  console.log(`OK    ${page.path}`)
}

console.log(
  `\n${manifest.pages.length - failures}/${manifest.pages.length} manifest URLs verified.`
)

if (failures > 0) {
  process.exit(1)
}
