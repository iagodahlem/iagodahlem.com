import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { absoluteUrl } from '@/lib/site'

// Statically generated at build time — required for this route with
// `output: 'export'`.
export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  // Static pages have no natural "last modified" source (no CMS, no file
  // mtime worth trusting in git) — lastmod is left unset for these and only
  // set for posts, where the frontmatter date is a meaningful signal.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/') },
    { url: absoluteUrl('/blog/') },
    { url: absoluteUrl('/about/') },
    { url: absoluteUrl('/talks/') },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}/`),
    lastModified: new Date(`${post.date}T00:00:00Z`),
  }))

  return [...staticRoutes, ...postRoutes]
}
