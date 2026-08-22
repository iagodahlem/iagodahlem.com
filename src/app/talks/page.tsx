import { talks } from '@/lib/talks'
import { PAGE_DESCRIPTIONS, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Talks',
  description: PAGE_DESCRIPTIONS.talks,
  path: '/talks/',
})

export default function TalksPage() {
  return (
    <div className="mx-auto max-w-[40rem] px-8 py-32">
      <h1 className="font-heading text-[37px] font-bold">Talks</h1>

      <div className="mt-8 flex flex-col gap-8">
        {talks.map((talk) => (
          <div key={talk.title}>
            <p className="font-body text-[21px] font-semibold">{talk.title}</p>

            {talk.description && (
              <p className="text-subtle">
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
                    className="link-fade text-subtle underline"
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
                  className="link-fade text-subtle underline"
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
