export const siteConfig = {
  name: 'Iago Dahlem Lorensini',
  description:
    "Hey there! I'm Iago — a software engineer from Florianópolis, Brazil. Most recently at Clerk, now open to new roles and consulting.",
  url: 'https://iagodahlem.com',
  author: {
    name: 'Iago Dahlem Lorensini',
    email: 'iagodahlemlorensini@gmail.com',
  },
  social: {
    github: 'https://github.com/iagodahlem',
    linkedin: 'https://www.linkedin.com/in/iagodahlem',
    instagram: 'https://instagram.com/iagodahlem',
    twitter: '@iagodahlem',
  },
}

export const socialLinks = [
  { href: siteConfig.social.github, label: 'Github' },
  { href: siteConfig.social.linkedin, label: 'Linkedin' },
  { href: siteConfig.social.instagram, label: 'Instagram' },
]

/** Resolves a site-relative path (e.g. "/blog/") to an absolute URL. */
export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString()
}
