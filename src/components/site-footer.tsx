import { socialLinks } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-subtle">
      <div className="mx-auto flex max-w-2xl justify-center gap-5 px-6 py-8 font-heading text-sm text-muted">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="link-fade"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  )
}
