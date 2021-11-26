// import { rgba } from 'polished'

const colors = {
  black: '#11111a',
  white: '#ffffff',
  gray: 'rgba(255,255,255, .2)',
  gradient: '',
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
