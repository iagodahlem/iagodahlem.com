import throttle from 'lodash/throttle'

const BACKGROUND_VISIBLE = 'header--backgroundVisible'
const HEADER_UP = 'header--up'

const header = document.querySelector('.js-header')
const headerHeight = header.clientHeight

const delta = 40
let lastScrollY = 0

const toggleBackground = (e) => {
  const scrollY = window.scrollY

  if (scrollY > 0) {
    header.classList.add(BACKGROUND_VISIBLE)
    return
  }

  header.classList.remove(BACKGROUND_VISIBLE)
  return
}

const toggleFixed = (e) => {
  const scrollY = window.scrollY

  if (Math.abs(lastScrollY - scrollY) <= delta) {
    return
  }

  if (scrollY > lastScrollY && scrollY > headerHeight * 2) {
    header.classList.add(HEADER_UP)
  } else {
    header.classList.remove(HEADER_UP)
  }

  lastScrollY = scrollY
}

const scrollHandle = (e) => {
  toggleBackground()
  toggleFixed()
}

export default () => {
  toggleBackground()
  toggleFixed()
  window.addEventListener('scroll', throttle(scrollHandle, 100))
}
