import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Footer from './Footer'
import Head from './Head'
import Header from './Header'
import Menu from './Menu'

class Layout extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node.isRequired,
  }

  state = {
    isMenuOpen: false,
  }

  handleToggleMenu = () => {
    const { isMenuOpen } = this.state

    this.setState({
      isMenuOpen: !isMenuOpen,
    })
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
                description
                author
                image
              }
            }
          }
        `}
        render={(data) => {
          const { isMenuOpen } = this.state
          const { description = '', title = '', children } = this.props
          const { siteMetadata: site } = data.site

          return (
            <>
              <Head
                title={title ? `${title} - ${site.title}` : site.title}
                description={description || site.description}
                author={site.author}
                isLock={isMenuOpen}
              />

              <Menu isOpen={isMenuOpen} onToggle={this.handleToggleMenu} />

              <Header onToggleMenu={this.handleToggleMenu} />

              <main>
                <section className='page'>
                  <header className='page__header'>
                    <div className='wrapper'>
                      <h2 className='page__title'>
                        {title || site.title}
                      </h2>

                      <p className='page__description'>
                        {description || site.description}
                      </p>
                    </div>

                    <div
                      className='page__banner'
                      style={{ backgroundImage: `url(${site.image})` }}
                    />
                  </header>

                  <div className='page__content wrapper'>
                    {children}
                  </div>
                </section>
              </main>

              <Footer />
            </>
          )
        }}
      />
    )
  }
}

export default Layout
