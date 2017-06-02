const ANIMATABLE = 'menu--animatable'
const VISIBLE = 'menu--visible'

export default () => {
  const menu = document.querySelector('.js-menu')
  const toggle = document.querySelector('.js-toggle')

  const handleToggleClick = function (e) {
    menu.classList.add(ANIMATABLE)

    if (!menu.classList.contains(VISIBLE)) {
      menu.classList.add(VISIBLE)
    } else {
      menu.classList.remove(VISIBLE)
    }
  }

  const handleMenuTransitionEnd = function (e) {
    menu.classList.remove(ANIMATABLE)
  }

  menu.addEventListener('transitionend', handleMenuTransitionEnd, false)
  toggle.addEventListener('click', handleToggleClick, false)
  menu.addEventListener('click', handleToggleClick, false)
}
