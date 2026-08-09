import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { PostList } from '@/components/post-list'
import { siteConfig, socialLinks } from '@/lib/site'
import { PAGE_DESCRIPTIONS, pageMetadata } from '@/lib/seo'

// Next's root-layout title template only applies to child segments, not
// to app/page.tsx itself (same segment as the layout that defines it) —
// so the homepage spells out the full title to match the live site's
// "Home / Iago Dahlem Lorensini". The OG/Twitter title below intentionally
// stays short, matching the live site's og:title.
export const metadata = pageMetadata({
  title: `Home / ${siteConfig.name}`,
  ogTitle: 'Home',
  description: PAGE_DESCRIPTIONS.home,
  path: '/',
})

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5)

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-heading text-2xl font-bold">
        Iago Dahlem Lorensini
      </h1>

      <p className="mt-4 font-heading text-2xl leading-snug">
        Hi! 👋 I&apos;m Iago.
        <br />A software engineer from Brazil.
        <br />
        Most recently at{' '}
        <a href="https://clerk.com" className="link-fade underline">
          Clerk.com
        </a>{' '}
        — now open to new roles and consulting.
      </p>

      <div className="mt-6 flex gap-5 font-heading text-sm text-muted">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="link-fade"
          >
            {link.label}
          </a>
        ))}
      </div>

      <section className="mt-16">
        <h2 className="font-heading text-xl font-bold">Latest Articles</h2>

        <div className="mt-6">
          <PostList posts={posts} />
        </div>

        <p className="mt-6 text-sm text-subtle">
          <Link href="/blog/" className="link-fade underline">
            All articles
          </Link>
        </p>
      </section>
    </div>
  )
}
