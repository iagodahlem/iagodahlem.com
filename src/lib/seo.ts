import type { Metadata } from 'next'
import { absoluteUrl, siteConfig } from './site'

/**
 * Hand-written meta descriptions for the site's non-post pages. ~150-160
 * characters, written for a human scanning search results — not
 * auto-derived from body copy. Reviewable in one place; post descriptions
 * live with their content in each post's frontmatter instead.
 */
export const PAGE_DESCRIPTIONS = {
  home: "Personal site of Iago Dahlem, a software engineer from Florianópolis, Brazil, building products end to end — most recently at Clerk.",
  about:
    "About Iago Dahlem: a Brazil-based software engineer's background and work history, from CWI Software through Clerk, and what he's looking for next.",
  blog: 'Articles on frontend architecture, CSS, Ruby on Rails, and other software engineering topics from Iago Dahlem, a software engineer based in Brazil.',
  talks:
    "Conference talks by Iago Dahlem on frontend architecture and React's state layer, with links to slides and video recordings where available.",
} as const

type PageMetadataInput = {
  /** Page title — the root layout's template appends the site name. */
  title: string
  description: string
  /** Site-relative path, trailing-slash form, matching parity/manifest.json. */
  path: string
  type?: 'website' | 'article'
  /** ISO 8601 timestamp, required when type is 'article'. */
  publishedTime?: string
  /**
   * OG/Twitter title override. Defaults to `title`. Only the homepage needs
   * this: its <title> must spell out the full "Home / <site name>" (Next's
   * title template doesn't apply to app/page.tsx, the same segment that
   * defines it), but its og:title should stay the short "Home" — matching
   * what the previous build actually rendered there.
   */
  ogTitle?: string
}

/**
 * Builds canonical + OpenGraph + Twitter metadata for a page from a single
 * set of inputs, so every route gets the same self-referencing canonical,
 * absolute og:url, and matching title/description without repeating each
 * field three times per page.
 *
 * OG titles intentionally use the short page title (no " / <site name>"
 * suffix) — that matches how the previous build's og:title was rendered,
 * confirmed against the live site before this migration.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  ogTitle = title,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path)

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph:
      type === 'article'
        ? {
            type: 'article',
            url,
            title: ogTitle,
            description,
            siteName: siteConfig.name,
            publishedTime,
          }
        : {
            type: 'website',
            url,
            title: ogTitle,
            description,
            siteName: siteConfig.name,
          },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
    },
  }
}
