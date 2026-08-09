import Link from 'next/link'
import type { PostSummary } from '@/lib/posts'

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    timeZone: 'UTC',
  })
}

const rowClassName =
  'link-fade flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-center sm:gap-4'

export function PostList({ posts }: { posts: PostSummary[] }) {
  return (
    <ul className="flex flex-col border-t border-b border-subtle [&>li:not(:last-child)]:border-b [&>li:not(:last-child)]:border-subtle">
      {posts.map((post) => {
        const dateEl = (
          <span className="shrink-0 text-sm text-subtle sm:text-right">
            {formatDate(post.date)}
          </span>
        )
        const titleEl = (
          <span className="font-heading text-lg font-bold">
            {post.title}
            {post.link && (
              <span className="ml-1 text-sm text-subtle" aria-hidden>
                ↗
              </span>
            )}
          </span>
        )

        return (
          <li key={post.slug}>
            {post.link ? (
              <a
                href={post.link}
                target="_blank"
                rel="noreferrer"
                className={rowClassName}
              >
                {titleEl}
                {dateEl}
              </a>
            ) : (
              <Link href={`/blog/${post.slug}/`} className={rowClassName}>
                {titleEl}
                {dateEl}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}
