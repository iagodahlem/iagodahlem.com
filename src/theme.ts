// import { rgba } from 'polished'

const colors = {
  black: '#11111a',
  white: '#ffffff',
  gray: {
    '50': '#f7f7f7',
    '100': '#e1e1e1',
    '200': '#cfcfcf',
    '300': '#b1b1b1',
    '400': '#9e9e9e',
    '500': '#7e7e7e',
    '600': '#626262',
    '700': '#515151',
    '800': '#3b3b3b',
    '900': '#222222',
  },
}

//                  1  2  3   4   5    6    7    8
const spaceScale = [0, 4, 8, 16, 32, 64, 128, 256, 512]

const componentsScale = {
  header: '72px',
}

const space = {
  ...spaceScale,
  ...componentsScale,
}

const sizes = {
  ...componentsScale,
}

const fonts = {
  body: '"Montserrat", sans-serif',
  heading: '"Arvo", serif',
}
//                    1  2  3  4   5   6   7   8   9   10  11
const fontSizes = [0, 5, 7, 9, 12, 16, 21, 28, 37, 50, 67, 89].map(
  (n) => `${n / 10}rem`
)

const fontWeights = [0, 400, 500, 600, 700]

const baseFontSize = '62.5%' // 1rem = 10px of the default 16px browser font-size

const theme = {
  colors,
  space,
  sizes,
  fonts,
  fontSizes,
  fontWeights,
  baseFontSize,
}

const themes = {
  light: theme,
  dark: {
    ...theme,
    colors: {
      ...theme.colors,
      black: theme.colors.white,
      white: theme.colors.black,
    },
  },
}

// const linearGradient = (color) =>
//   `linear-gradient(90deg, ${rgba(color, 0)} 0%, ${rgba(color, 1)} 100%)`

// The /resume PDF export (PrinterLayout) needs to fit on one physical page.
// These two factors shrink every rem-based size (headings and body copy, via
// baseFontSize) and every space-prop margin/padding (Section's py, heading
// and job gaps, via the space scale) proportionally, so nothing needs
// hand-tuning per element. Only the /resume route uses this theme — see
// Layout.tsx, which selects it when `pageContext.layout === 'printer'`.
const PRINT_FONT_SCALE = 0.72
const PRINT_SPACE_SCALE = 0.125

export const printTheme = {
  ...themes.dark,
  baseFontSize: `${parseFloat(baseFontSize) * PRINT_FONT_SCALE}%`,
  space: {
    ...spaceScale.map((n) => Math.round(n * PRINT_SPACE_SCALE)),
    ...componentsScale,
  },
}

export default themes.dark
