import type { Metadata } from 'next'
import { talks } from '@/lib/talks'

export const metadata: Metadata = {
  title: 'Talks',
  alternates: { canonical: '/talks/' },
}

export default function TalksPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-heading text-2xl font-bold">Talks</h1>

      <div className="mt-8 flex flex-col gap-8">
        {talks.map((talk) => (
          <div key={talk.title}>
            <p className="font-heading text-lg font-bold">{talk.title}</p>

            {talk.description && (
              <p className="text-muted">
                <em>{talk.description}</em>
              </p>
            )}

            <ul className="mt-2 flex flex-col gap-1">
              {talk.videoUrl && (
                <li>
                  <a
                    href={talk.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link-fade text-muted underline"
                  >
                    <em>Video</em>
                  </a>
                </li>
              )}

              <li>
                <a
                  href={talk.slidesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-fade text-muted underline"
                >
                  <em>Slides</em>
                </a>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
