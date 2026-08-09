import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPostSlugs, getPostBySlug } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    timeZone: 'UTC',
  })
}

async function loadPost(slug: string) {
  try {
    return await getPostBySlug(slug)
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await loadPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description || siteConfig.description,
    alternates: { canonical: `/blog/${slug}/` },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await loadPost(slug)
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <header className="flex flex-col items-center text-center">
        <h1 className="font-heading text-3xl font-bold">{post.title}</h1>
        <p className="mt-3 text-sm text-subtle">{formatDate(post.date)}</p>
        {post.link && (
          <p className="mt-4 text-sm text-subtle">
            Originally published at{' '}
            <a href={post.link} className="link-fade underline" target="_blank" rel="noreferrer">
              {new URL(post.link).hostname}
            </a>
          </p>
        )}
      </header>

      <div
        className="prose mt-12"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  )
}
