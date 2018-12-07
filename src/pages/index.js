import React from 'react'
import { graphql } from 'gatsby'
import { Layout, Link } from '../components'

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <h2 className='page__heading'>
        Latest Articles
      </h2>

      {posts.map(({ node: post }) => {
        const { frontmatter, fields, excerpt } = post
        const link = frontmatter.link
          ? { as: 'a', href: frontmatter.link }
          : { to: fields.slug }

        return (
          <div className='post-list' key={post.id}>
            <h3 className='post-list__title'>
              <Link {...link}>
                {frontmatter.title}
              </Link>
            </h3>

            <p className='post-list__description'>
              {frontmatter.description || excerpt}
            </p>

            <div className='post-list__footer'>
              <p className='post-list__date'>{frontmatter.date}</p>

              <Link className='post-list__link' {...link}>
                Read More
              </Link>
            </div>
          </div>
        )
      })}

      <Link className='button' to='/blog'>
        See more Articles
      </Link>
    </Layout>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            description
            date(formatString: "MMMM DD, YYYY")
            link
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default IndexPage
