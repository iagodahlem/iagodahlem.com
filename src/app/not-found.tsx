import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not Found',
  description: "This route doesn't exist.",
}

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      <h1 className="font-heading text-5xl font-bold">404</h1>
      <p className="mt-6 text-lg text-muted">
        You just hit a route that doesn&apos;t exist... the sadness.
      </p>
    </div>
  )
}
