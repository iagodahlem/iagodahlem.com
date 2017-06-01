const pageHeight = () => {
  const height = document.documentElement.clientHeight
  const pageHeader = document.querySelector('.js-page-header')

  if (!pageHeader) {
    return
  }

  pageHeader.style.height = `${height}px`
}

const bindMenu = () => {
  const ANIMATABLE_CLASS = 'menu--animatable'
  const VISIBLE_CLASS = 'menu--visible'

  const menu = document.querySelector('.js-menu')
  const toggle = document.querySelector('.js-toggle')

  const handleToggleClick = function (e) {
    menu.classList.add(ANIMATABLE_CLASS)

    if (!menu.classList.contains(VISIBLE_CLASS)) {
      menu.classList.add(VISIBLE_CLASS)
    } else {
      menu.classList.remove(VISIBLE_CLASS)
    }
  }

  const handleMenuTransitionEnd = function (e) {
    menu.classList.remove(ANIMATABLE_CLASS)
  }

  menu.addEventListener('transitionend', handleMenuTransitionEnd, false)
  toggle.addEventListener('click', handleToggleClick, false)
  menu.addEventListener('click', handleToggleClick, false)
}

window.addEventListener('load', (e) => {
  bindMenu()
})
