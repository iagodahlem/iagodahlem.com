import Link from 'next/link'

const NAV_LINKS = [
  { href: '/about/', label: 'About' },
  { href: '/blog/', label: 'Articles' },
  { href: '/talks/', label: 'Talks' },
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
