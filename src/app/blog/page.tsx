import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import { PostList } from '@/components/post-list'

export const metadata: Metadata = {
  title: 'Articles',
  description: 'All Articles',
  alternates: { canonical: '/blog/' },
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-heading text-2xl font-bold">All Articles</h1>

      <div className="mt-8">
        <PostList posts={posts} />
      </div>
    </div>
  )
}
