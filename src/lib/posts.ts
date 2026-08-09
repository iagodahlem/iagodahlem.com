import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'

// Content lives in place at src/pages/blog/<slug>/index.md — the folder
// name IS the URL slug (this matches exactly how the old Gatsby build
// derived it, confirmed against the live site's URLs in parity/manifest.json).
const BLOG_DIR = path.join(process.cwd(), 'src/pages/blog')

export type PostFrontmatter = {
  title: string
  description: string
  date: string
  tags: string[]
  /** External URL the post was originally published at, if any. */
  link?: string
}

export type PostSummary = PostFrontmatter & { slug: string }
export type Post = PostSummary & { html: string }

function readSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
}

function readFrontmatter(slug: string): PostFrontmatter {
  const raw = fs.readFileSync(path.join(BLOG_DIR, slug, 'index.md'), 'utf8')
  const { data } = matter(raw)
  return data as PostFrontmatter
}

export function getAllPostSlugs(): string[] {
  return readSlugs()
}

export function getAllPosts(): PostSummary[] {
  return readSlugs()
    .map((slug) => ({ slug, ...readFrontmatter(slug) }))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

/**
 * Rewrites post-relative image paths (e.g. `./images/foo.png`) to the
 * public URL they were migrated to (`/blog/<slug>/images/foo.png`).
 * Leaves absolute and remote URLs untouched.
 */
function rewriteRelativeImages(slug: string) {
  return (tree: Root) => {
    visit(tree, 'image', (node) => {
      if (/^https?:\/\//.test(node.url) || node.url.startsWith('/')) {
        return
      }
      const cleaned = node.url.replace(/^\.\//, '')
      node.url = `/blog/${slug}/${cleaned}`
    })
  }
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const raw = fs.readFileSync(path.join(BLOG_DIR, slug, 'index.md'), 'utf8')
  const { data, content } = matter(raw)

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(rewriteRelativeImages, slug)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(content)

  return {
    slug,
    ...(data as PostFrontmatter),
    html: String(processed),
  }
}
