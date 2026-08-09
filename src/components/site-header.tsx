import Link from 'next/link'

// The live site also has a "Talks" nav entry (proxied to a separate
// subdomain via a host-level redirect). That page isn't part of this
// migration pass, so it's left out of the nav rather than shipping a link
// that 404s on this branch.
const NAV_LINKS = [
  { href: '/about/', label: 'About' },
  { href: '/blog/', label: 'Articles' },
]

export function SiteHeader() {
  return (
    <header className="border-b border-subtle">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-heading text-xl font-bold link-fade"
          aria-label="Home"
        >
          I.
        </Link>

        <nav className="flex gap-5 font-heading text-sm">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="link-fade">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
