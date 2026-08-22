import { socialLinks } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto flex max-w-[40rem] justify-center gap-5 p-8 font-heading text-base leading-[normal]">
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
