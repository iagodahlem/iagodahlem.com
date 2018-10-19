import React from 'react'
import cx from 'classnames'
import Icon from './Icon'
import Nav from './Nav'
import Social from './Social'

const Menu = ({ isOpen, onToggle }) => (
  <div className={cx('menu', { isOpen })}>
    <header className='menu__header'>
      <div className='menu__close' onClick={onToggle}>
        <Icon icon='times' />
      </div>
    </header>

    <div className='menu__body'>
      <Nav />
    </div>

    <footer className='menu__footer'>
      <Social />
    </footer>
  </div>
)

export default Menu
