// Ported verbatim from the live site's experience data (src/content/about.tsx
// on the Gatsby build). Dates are fixed, so durations below are stable.
export const jobs = [
  {
    jobTitle: 'Senior Software Engineer',
    jobType: 'Full-time',
    companyName: 'Clerk.com',
    companyUrl: 'https://clerk.com',
    startDate: new Date('Jan, 07, 2025'),
    endDate: new Date('July, 09, 2026') as Date | null,
    stack: 'React · TypeScript · Go',
    detail:
      'B2B side of the authentication platform: organizations, SSO & enterprise connections (SAML/OIDC), SCIM directory sync, roles & permissions.',
  },
  {
    jobTitle: 'Senior Software Engineer',
    jobType: 'Full-time',
    companyName: 'StickerMule',
    companyUrl: 'https://stickermule.com',
    startDate: new Date('Dec, 05, 2022'),
    endDate: new Date('Jan, 03, 2025') as Date | null,
    stack: 'Ruby on Rails · Node.js',
    detail:
      'Backend on the Finances then Platform teams: order management, and migrating the legacy Rails monolith to Node microservices.',
  },
  {
    jobTitle: 'Senior Software Engineer',
    jobType: 'Full-time',
    companyName: 'Codeminer42',
    companyUrl: 'https://codeminer42.com',
    startDate: new Date('May, 2017'),
    endDate: new Date('Dec, 02, 2022') as Date | null,
    stack: 'React · Node · Ruby',
    detail:
      'Full-stack consulting for international clients: GoDaddy, StackCommerce, Edlio, LiftForward, 9Count, Folha de S.Paulo.',
  },
  {
    jobTitle: 'Software Engineer',
    jobType: 'Full-time',
    companyName: 'CWI Software',
    companyUrl: 'https://cwi.com.br',
    startDate: new Date('September, 2015'),
    endDate: new Date('May, 2017') as Date | null,
    stack: 'Java · Angular · Oracle · Sass',
    detail:
      'Frontend for a health-insurance company, building most of the UI for their new applications.',
  },
]
