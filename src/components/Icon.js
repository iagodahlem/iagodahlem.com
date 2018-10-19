import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const Hamburger = ({ className, ...props }) => (
  <div className={cx('Hamburger', className)} {...props}>
    <span />
    <span />
    <span />
  </div>
)

const Times = ({ className }) => (
  <div className={cx('Times', className)}>
    <span />
    <span />
  </div>
)

const icons = {
  hamburger: Hamburger,
  times: Times,
}

const Icon = ({ icon, ...props }) => {
  const I = icons[icon]

  return (
    <I {...props} />
  )
}

Icon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(icons)),
}

export default Icon
