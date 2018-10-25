import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import cx from 'classnames'

const Head = ({ title, description, author, isLock }) => (
  <Helmet
    title={title}
    meta={[
      { name: 'description', content: description },
      { name: 'author', content: author },
    ]}
  >
    <html lang='en' className={cx({ isLock })} />

    <link
      href='https://fonts.googleapis.com/css?family=Arvo:400,400i,700|Montserrat:300,400,500,600,700|Open+Sans:400,700,400i'
      rel='stylesheet'
    />
  </Helmet>
)

Head.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  isLock: PropTypes.bool.isRequired,
}

export default Head
