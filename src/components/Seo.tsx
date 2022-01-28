import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

type Props = {
  title?: string
  description?: string
  lang?: string
  pathname?: string
}

const Seo: FC<Props> = ({
  title = '',
  description = '',
  lang = 'en',
  pathname = '',
}) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query SiteMetadata {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author {
              name
            }
            social {
              github
              linkedin
              twitter
              instagram
            }
          }
        }
      }
    `
  )

  const seo = {
    title: title || siteMetadata.title,
    description,
    canonicalUrl: pathname
      ? `${siteMetadata.siteUrl}${pathname.replace(/\/$/, '')}`
      : siteMetadata.siteUrl,
    ...siteMetadata,
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s / ${siteMetadata.title}`}
    >
      <meta name='description' content={seo.description} />
      {seo.canonicalUrl && <link rel='canonical' href={seo.canonicalUrl} />}
      {seo.image && <meta name='image' content={seo.image} />}

      <meta property='og:url' content={seo.url} />
      <meta property='og:title' content={seo.title} />
      <meta property='og:description' content={seo.description} />
      {seo.image && <meta property='og:image' content={seo.image} />}

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:creator' content={seo.social.twitter} />
      <meta name='twitter:title' content={seo.title} />
      <meta name='twitter:description' content={seo.description} />
      {seo.image && <meta name='twitter:image' content={seo.image} />}
    </Helmet>
  )
}

export default Seo
