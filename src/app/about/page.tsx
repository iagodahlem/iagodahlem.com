import { Experience } from '@/components/experience'
import { PAGE_DESCRIPTIONS, pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'About',
  description: PAGE_DESCRIPTIONS.about,
  path: '/about/',
})

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[40rem] px-8 py-32">
      <h1 className="font-heading text-[37px] font-bold">About Me</h1>

      <div className="mt-6 flex flex-col gap-4 leading-8 text-muted">
        <p>
          Hey there! 👋 I&apos;m Iago — a software engineer from Brazil. I
          build products end to end: frontend-first, but happy to follow a
          problem into the backend, the database, or the design file.
        </p>

        <p>
          For about a year and a half I was a Senior Software Engineer at
          Clerk, working on the B2B side of the authentication platform. I
          worked across the stack, React and TypeScript in the dashboard and
          Go on the backend, on organizations, SSO and enterprise connections
          (SAML and OIDC), SCIM directory sync, and roles &amp; permissions.
        </p>

        <p>
          Before Clerk I was at Sticker Mule, and spent five years at
          Codeminer42 consulting for teams like GoDaddy, StackCommerce, and
          Folha de S.Paulo. The way I like to work: ship in small,
          well-tested increments, sweat the corner cases, and keep software
          maintainable as it grows.
        </p>

        <p>
          I live in Florianópolis with my wife 👩, our crazy dog Helga 🐶,
          and our daughter Ramona 👶. When I&apos;m not working you&apos;ll
          find me playing with Ramona, sneaking in a video game when she lets
          me, cooking for the family (Sunday BBQ 🍖 is sacred), or fixing
          something around the house.
        </p>

        <p>
          I&apos;m currently looking for a new role. If you&apos;re building
          something interesting,{' '}
          <a
            href="mailto:iagodahlemlorensini@gmail.com"
            className="link-fade font-semibold text-ink"
          >
            say hi
          </a>
          .
        </p>
      </div>

      <Experience />
    </div>
  )
}
