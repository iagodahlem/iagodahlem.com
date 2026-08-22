#!/usr/bin/env node
// Asserts that every URL in parity/manifest.json exists as a static page in
// the `next build` (output: 'export') output directory, with a matching
// <title> — plus that /rss.xml and /sitemap.xml exist and are well-formed
// XML. Run after `next build`:
//
//   npm run build && npm run verify:parity

import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { XMLValidator } from 'fast-xml-parser'

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

// SEO infra files: must exist and parse as well-formed XML.
const xmlFiles = ['/rss.xml', '/sitemap.xml']
let xmlFailures = 0

for (const urlPath of xmlFiles) {
  const filePath = path.join(outDir, urlPath.replace(/^\//, ''))

  if (!existsSync(filePath)) {
    console.error(`FAIL  ${urlPath}  -- missing (expected ${path.relative(repoRoot, filePath)})`)
    xmlFailures += 1
    continue
  }

  const xml = readFileSync(filePath, 'utf8')
  const result = XMLValidator.validate(xml)

  if (result !== true) {
    console.error(`FAIL  ${urlPath}  -- not well-formed XML: ${result.err.msg} (line ${result.err.line})`)
    xmlFailures += 1
    continue
  }

  console.log(`OK    ${urlPath}  (well-formed XML)`)
}

console.log(`${xmlFiles.length - xmlFailures}/${xmlFiles.length} SEO infra files verified.`)

failures += xmlFailures

if (failures > 0) {
  process.exit(1)
}
