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

const theme = {
  colors,
  space,
  sizes,
  fonts,
  fontSizes,
  fontWeights,
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

export default themes.dark
