import header from './header'
import menu from './menu'

const loadHandle = () => {
  header()
  menu()
}

window.addEventListener('load', loadHandle)
