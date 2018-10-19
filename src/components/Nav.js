import React from 'react'
import cx from 'classnames'
import { Link } from 'gatsby'

const nav = [
  { children: 'Home', to: '/' },
  { children: 'About', to: '/about' },
  { children: 'Blog', to: '/blog' },
]

const Nav = ({ className, ...props }) => (
  <nav className={cx('nav', className)} {...props}>
    <ul className='nav__list'>
      {nav.map(item => (
        <li className='nav__item' key={item.to}>
          <Link {...item} />
        </li>
      ))}
    </ul>
  </nav>
)

export default Nav
