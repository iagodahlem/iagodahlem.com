# design-sync notes — iagodahlem.com

Repo-specific gotchas for future syncs. Read this before touching `config.json`.

## Shape and entry

- This is a **Gatsby site, not a component library**: `package.json` is `private`,
  ships no `main`/`module`/`exports`, and `gatsby build` emits a static site, not a
  bundle. Shape is `package`.
- `package.json` originally had **no `name` field**, which crashed the converter:
  `lib/dts.mjs` walks up for the nearest `package.json` with a `name`, ran off the
  filesystem root and died on `ENOENT /package.json`. Added `"name": "iagodahlem-com"`.
  Do not remove it.
- Every file in `src/components/` uses `export default`, and the converter's
  synthesized entry emits `export * from`, which **cannot re-export defaults** — it
  would discover zero components. `.design-sync/entry.tsx` is the named barrel that
  fixes this, and is also where the preview provider is defined. The app's own
  `src/components/index.tsx` is *not* usable as the entry: it omits `Button` and
  includes page plumbing (`Seo`, `Nav`, `Header`, `Articles`) that is out of scope.
- Synced scope is 10 components (primitives + `ProjectCard`/`PreviewFrame`), chosen by
  the user. `Seo`, `Nav`, `Header`, `Articles`, `Menu`, `BlogPost`, `GlobalStyle`,
  `Image` are deliberately excluded. To add one, add it to `entry.tsx` **and**
  `cfg.componentSrcMap`; both are required.

## The `css` prop — the big one

`ProjectCard`, `PreviewFrame`, `Link` and `Menu` style themselves with
`css={css({...})}` from `@styled-system/css`. That prop is **not a runtime feature**:
`babel-plugin-styled-components` rewrites it at build time, which Gatsby does via
`gatsby-plugin-styled-components`. The converter bundles with esbuild, which runs no
Babel — so bundling `src/` directly **silently drops every `css={}` rule** while
styled-system props keep working. Symptom: cards render with correct type and colour
but no borders, gaps, chips or aspect ratios, and nothing fails.

`.design-sync/build-dist.mjs` exists solely to fix this: it runs the repo's own
`babel-plugin-styled-components` over the sources into `dist/` first, and the
converter bundles that. **Always run `cfg.buildCmd` before `package-build.mjs`.**
The same limitation applies to the design agent, so `conventions.md` tells it to use
`style={{}}` instead of the `css` prop.

## React 16 vs the preview harness

The app is pinned to React 16.14 (Gatsby 4), but the emitted preview cards mount with
`ReactDOM.createRoot` — the React 18 root API. With React 16 vendored, **every card
fails with "ReactDOM.createRoot is not a function"** and falls back to the floor card,
which reads as "unauthored" rather than "broken" — easy to misdiagnose.

`.design-sync/setup-node-modules.sh` builds `.design-sync/.cache/nm`: symlinks to the
repo's real dependencies with `react`/`react-dom` overridden to 18.3.1. Pass that as
`--node-modules`. `react`, `react-dom`, `react-is` and `scheduler` are all externalised
to window globals by the bundler, so this changes only the runtime React, not a single
bundled dependency. claude.ai/design renders on a modern React anyway, so this is also
the closer match to the target runtime.

## Node version

The repo pins Node 16.2.0 (`.nvmrc`), which is too old for the converter scripts
(`node:fs` has no `cpSync` before 16.7). Run the repo's `yarn install` on 16.2.0, but
run **all `.ds-sync/` scripts and `build-dist.mjs` on Node 22** (`~/.nvm/versions/node/v22.21.1/bin/node`).

## Commands (in order)

The three setup steps are not optional — see the two sections above for why.

```bash
N=~/.nvm/versions/node/v22.21.1/bin/node        # NOT the repo's pinned 16.2.0

yarn install --frozen-lockfile                   # on Node 16.2.0
bash .design-sync/setup-node-modules.sh          # react 18 override -> .design-sync/.cache/nm
$N .design-sync/build-dist.mjs                   # cfg.buildCmd: babel css-prop transform -> dist/

# converter (staged scripts live in .ds-sync/, gitignored — re-copy from the skill if absent)
$N .ds-sync/package-build.mjs --config .design-sync/config.json \
   --node-modules ./.design-sync/.cache/nm --entry ./dist/.design-sync/entry.js --out ./ds-bundle
$N .ds-sync/package-validate.mjs ./ds-bundle
$N .ds-sync/package-capture.mjs --out ./ds-bundle

# final build before any upload must be a driver run (regenerates .sync-diff.json)
$N .ds-sync/resync.mjs --config .design-sync/config.json \
   --node-modules ./.design-sync/.cache/nm --out ./ds-bundle \
   --entry ./dist/.design-sync/entry.js --remote .design-sync/.cache/remote-sync.json
```

On a re-sync, first save the project's anchor to `.design-sync/.cache/remote-sync.json`
(`DesignSync get_file _ds_sync.json`) so the driver can skip unchanged components.
Playwright must match a cached chromium build — `playwright@1.61.1` pins chromium-1228,
which is what is in `~/.cache/ms-playwright/`.

## Styling and fonts

- `[CSS_RUNTIME]` is the correct, expected verdict — styled-components injects
  everything at runtime, so there is no static component CSS. Non-blocking.
- Do **not** set `cfg.cssEntry` to a stylesheet that only contains `@import`s: that
  produces an `@import`-only `_ds_bundle.css` and hard-fails `[CSS_PLACEHOLDER]`.
  (First attempt pointed it at a Google Fonts `@import`; that is why it is gone.)
- Montserrat and Arvo are **self-hosted** in `.design-sync/fonts/` (SIL OFL 1.1) and
  wired via `cfg.extraFonts`, rather than pulled from Google Fonts as the site does at
  runtime — designs then need no network call. Montserrat is a **variable** font: one
  file per subset covers the whole 400–700 range, so do not re-download it per weight
  (the first pass did, and shipped 4 identical copies / 458KB instead of 140KB).

## Theme

`src/theme.ts` exports **`themes.dark`**, which swaps the palette: `colors.black` is
`#ffffff` and `colors.white` is `#11111a`. Read these as ink/paper. Previews and
`conventions.md` both depend on this; a light-theme export would invert every card.

## Types

There is no `.d.ts` tree (no library build), so `cfg.dtsPropsFor` carries
hand-written props bodies for all 10 components. This is deliberate and better than
generated output: `tsc` declarations for `styled(Box)` would emit hundreds of
styled-system shorthand props as noise. **Keep them in sync with the sources by hand**
when a component's API changes.

## Known render warns

None outstanding. The final validate run is clean apart from the expected
`[CSS_RUNTIME]` line.

## Not previewed

- `PreviewFrame` `state='live'` mounts a sandboxed iframe against the public internet.
  It is not statically renderable and is deliberately left out of the preview cells;
  `ProjectCard` previews use `embeddable: false` project shapes for the same reason.
- Hover/tap states (`framer-motion` `whileHover`/`whileTap` on `ProjectCard` links and
  the `Menu` trigger) cannot render statically.

## Re-sync risks

- **`dtsPropsFor` is hand-maintained.** If a component gains or loses props in
  `src/components/`, nothing detects the drift — the emitted `.d.ts` will simply be
  wrong. Diff the sources against the config when re-syncing after component changes.
- **`entry.tsx` is a hand-maintained barrel.** A new component in `src/components/`
  will not appear until it is added there *and* to `componentSrcMap`.
- **Preview content is inlined.** `previews/ProjectCard.tsx` copies three entries from
  `src/data/projects.json`; if those projects change or are removed, the cards keep
  showing stale content. Re-check on any projects.json edit.
- **React 18 is pinned by `setup-node-modules.sh`.** If the app ever upgrades past
  React 18, reconcile that pin.
- **Fonts were fetched from Google Fonts at sync time** and are now vendored; they will
  not track upstream revisions.
- `conventions.md` names concrete tokens, scales and component names. Re-validate them
  against a fresh build whenever the theme or component set changes.
