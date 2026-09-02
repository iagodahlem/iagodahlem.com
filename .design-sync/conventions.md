## How to build with this design system

A small, opinionated set from iagodahlem.com. It is **styled-system + styled-components**:
there are **no CSS classes and no utility class names** — every visual decision is a
prop on a component, resolved against the theme. Never write `className="..."`
against this library; nothing will match.

### 1. Wrap everything in `DesignSystemProvider`

```jsx
const { DesignSystemProvider, Section, Container, Heading, Text } = window.IagoDS

<DesignSystemProvider>
  {/* your screen */}
</DesignSystemProvider>
```

Every component reads its scales from styled-components' theme context. Outside the
provider, token props silently fall through as raw CSS (`fontSize='6'` becomes
`font-size: 6px`) and the page gets no background or ink. The provider also mounts
the global style that sets the 62.5% root font-size the whole type scale is
calibrated against — so it is required, not decorative.

**This is a dark theme, and the colour names are inverted.** `colors.black` is
`#ffffff` and `colors.white` is `#11111a`. `color='black'` means "the default ink",
which renders white on the dark page. This trips up everyone once — read it as
ink/paper, not as literal colour.

### 2. The prop vocabulary (the whole styling language)

Scale props take the **index as a string** (`fontSize='6'`, `p='4'`); raw CSS
lengths (`maxWidth='640px'`) also work anywhere.

| Family | Props | Scale |
|---|---|---|
| Space | `m mt mr mb ml mx my p pt pr pb pl px py` | index `0`–`8` → 0, 4, 8, 16, 32, 64, 128, 256, 512px; `'header'` → 72px |
| Colour | `color bg borderColor` | `black`, `white`, `gray.50` `100` `200` `300` `400` `500` `600` `700` `800` `900` |
| Type | `fontSize` | index `0`–`11` → 0, .5, .7, .9, 1.2, 1.6, 2.1, 2.8, 3.7, 5, 6.7, 8.9rem |
| Type | `fontFamily` | `'body'` (Montserrat) · `'heading'` (Arvo) |
| Type | `fontWeight` | index `1`–`4` → 400, 500, 600, 700 |
| Type | `lineHeight letterSpacing textAlign textTransform` | raw CSS values |
| Layout | `width height minWidth maxWidth minHeight maxHeight display overflow` | raw CSS |
| Flex | `flexDirection alignItems justifyContent flexWrap flex flexGrow alignSelf order` | raw CSS |
| Border | `border borderColor borderRadius borderTop borderBottom` | raw CSS + colour tokens |
| Position | `position top right bottom left zIndex` | raw CSS |

`as` makes any component polymorphic: `<Text as='h1'>`, `<Button as='button'>`,
`<Container as={Flex}>`.

**Do not use the `css={css({...})}` prop.** You will see it throughout the original
source; it is a build-time Babel transform that is not available here, so it renders
nothing. For anything the prop families above do not cover — `gap`, `grid-template-columns`,
`aspect-ratio`, `transform` — use plain `style={{ ... }}`.

### 3. Composition rules

- **`Section` is the band, `Container` is the column.** Page structure is
  `Section` (`py='6'` = 128px) → `Container` (640px, centred, `px={4}`) → content.
  Widen with `<Container maxWidth='960px'>` rather than inventing a new wrapper.
- **`Heading` has no size of its own.** It renders `<h2>` and inherits `Text`; always
  set `as`, `fontSize` and `fontWeight` for the level you want.
- **`Button` is typographic** — transparent, no border, Arvo at `fontSize='6'`. It is
  the header's menu trigger, not a filled pill. Pass `as='button'` for real buttons.
- **`Flex` is `Box` with `display: flex`**; `Box` is the base for everything else.

### 4. Where the truth is

Read `_ds/<folder>/styles.css` and the `fonts/` it imports for the shipped faces, and
each component's `.d.ts` and `.prompt.md` for its exact contract. `ProjectCard` and
`PreviewFrame` are the two composites — read their props before composing them.

### 5. An idiomatic screen

```jsx
const { DesignSystemProvider, Section, Container, Heading, Text, Flex, Link } = window.IagoDS

<DesignSystemProvider>
  <Section py='5'>
    <Container>
      <Text fontSize='4' color='gray.300' textTransform='uppercase'
            style={{ letterSpacing: '0.08em' }}>
        21 January 2022
      </Text>
      <Heading as='h1' fontSize='8' fontFamily='heading' fontWeight='4' mt='3' mb='3'>
        5 truths about Tailwind CSS
      </Heading>
      <Text fontSize='5' color='gray.100' style={{ maxWidth: '60ch' }}>
        Body copy sits on the 1.6rem step, one notch below the subhead.
      </Text>
      <Flex alignItems='center' mt='4' style={{ gap: '24px' }}>
        <Link href='/blog' fontWeight='4'>Back to the blog</Link>
        <Link href='/projects' color='gray.300'>Projects</Link>
      </Flex>
    </Container>
  </Section>
</DesignSystemProvider>
```
