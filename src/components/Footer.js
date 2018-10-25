import React from 'react'
import Social from './Social'

const Footer = () => (
  <footer className='footer'>
    <div className='footer__social'>
      <Social />
    </div>

    <p className='footer__paragraph'>
      Made with <span className='heart'>&#10084;</span> by <a href='mailto:iagodahlemlorensini@gmail.com'>Iago Dahlem Lorensini</a>
    </p>
  </footer>
)

export default Footer
