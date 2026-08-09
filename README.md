# iagodahlem.com

:earth_americas: My personal website — a statically-generated Next.js site.

## Stack

- [Next.js](https://nextjs.org) (App Router), exported as static HTML (`output: 'export'`)
- TypeScript
- Tailwind CSS v4
- Markdown posts (`gray-matter` + a `unified`/`remark`/`rehype` pipeline, syntax highlighting via `rehype-highlight`)

## Content

Blog posts live in place at `src/pages/blog/<slug>/index.md`. The folder name is the URL slug
(`/blog/<slug>/`) — this matches the URLs the previous build produced, verified against the live
site in `parity/manifest.json`.

## Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run typecheck
npm run lint
npm run build         # static export, written to out/
npm run verify:parity # asserts every URL in parity/manifest.json exists in out/ with a matching title
```

## License

[MIT License](http://iagodahlem.mit-license.org/) © Iago Dahlem
