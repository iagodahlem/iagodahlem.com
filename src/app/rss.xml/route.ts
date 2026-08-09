import { getAllPostsWithHtml } from '@/lib/posts'
import { absoluteUrl, siteConfig } from '@/lib/site'

// Statically generated at build time — no request-time data is used.
export const dynamic = 'force-static'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function cdata(value: string) {
  // Guard against a literal "]]>" inside content breaking out of the CDATA
  // section — split it across two adjacent CDATA blocks.
  return `<![CDATA[${value.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`
}

function rfc822(dateIso: string) {
  return new Date(`${dateIso}T00:00:00Z`).toUTCString()
}

/**
 * Post HTML uses root-relative URLs (image src, internal links), which is
 * correct for pages served on the site itself but unreliable in a feed
 * reader with no notion of the site's origin. Absolutize them for the feed.
 */
function absolutizeUrls(html: string) {
  return html.replace(/(src|href)="\/(?!\/)/g, `$1="${siteConfig.url}/`)
}

export async function GET() {
  const posts = await getAllPostsWithHtml()
  const feedUrl = absoluteUrl('/rss.xml')

  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}/`)
      // Full-content item: for posts whose canonical content lives on an
      // external blog (frontmatter `link`), prepend the same "originally
      // published at" framing shown on the post page itself.
      const content = post.link
        ? `<p>Originally published at <a href="${post.link}">${new URL(post.link).hostname}</a>.</p>${absolutizeUrls(post.html)}`
        : absolutizeUrls(post.html)

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <content:encoded>${cdata(content)}</content:encoded>
    </item>`
    })
    .join('\n')

  const lastBuildDate = posts[0] ? rfc822(posts[0].date) : new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
