import React, { PureComponent } from 'react'
import { Link } from 'gatsby'
import debounce from 'lodash/debounce'
import cx from 'classnames'
import Icon from './Icon'
import Nav from './Nav'

class Header extends PureComponent {
  constructor(props) {
    super(props)

    this.delta = 80
    this.lastScrollY = 0
    this.headerHeight = 62
  }

  state = {
    isBackgroundVisible: false,
    isHeaderUp: false,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = debounce(() => {
    this.toggleBackground()
    this.toggleUp()
  })

  toggleBackground() {
    const scrollY = window.scrollY

    if (scrollY > 0) {
      this.setState({ isBackgroundVisible: true })
      return
    }

    this.setState({ isBackgroundVisible: false })
  }

  toggleUp() {
    const scrollY = window.scrollY

    if (Math.abs(this.lastScrollY - scrollY) <= this.delta) {
      return
    }

    if (scrollY > this.lastScrollY && scrollY > this.headerHeight * 2) {
      this.setState({ isHeaderUp: true })
    } else {
      this.setState({ isHeaderUp: false })
    }

    this.lastScrollY = scrollY
  }

  render() {
    const { isBackgroundVisible, isHeaderUp } = this.state
    const { onToggleMenu } = this.props

    return (
      <header
        className={cx('header', {
          'header--backgroundVisible': isBackgroundVisible,
          'header--up': isHeaderUp,
        })}
      >
        <h1 className='header__title'>
          <Link to='/'>I.</Link>
        </h1>

        <Nav className='u-hide u-show--md' />

        <div className='header__toggle u-hide--md' onClick={onToggleMenu}>
          <Icon icon='hamburger' />
        </div>
      </header>
    )
  }
}

export default Header
