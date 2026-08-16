import Link from 'next/link'

const NAV_LINKS = [
  { href: '/about/', label: 'About' },
  { href: '/blog/', label: 'Articles' },
  { href: '/talks/', label: 'Talks' },
]

export function SiteHeader() {
  return (
    <header>
      <div className="mx-auto flex max-w-[40rem] items-center justify-between px-8 py-3.5">
        <Link
          href="/"
          className="font-heading text-[37px] font-bold leading-[normal] link-fade"
          aria-label="Home"
        >
          I.
        </Link>

        <nav className="flex gap-5 font-heading text-[21px] font-bold leading-[normal]">
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
