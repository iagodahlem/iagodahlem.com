import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <h2 className='page__heading'>
        Latest Articles
      </h2>

      {posts.map(({ node: post }) => {
        const { frontmatter, fields, excerpt } = post

        return (
          <div className='post-list' key={post.id}>
            <h3 className='post-list__title'>
              <Link to={fields.slug}>
                {frontmatter.title}
              </Link>
            </h3>

            <p className='post-list__description'>
              {excerpt}
            </p>

            <div className='post-list__footer'>
              <p className='post-list__date'>{frontmatter.date}</p>

              <Link className='post-list__link' to={fields.slug}>
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
            date(formatString: "MMMM DD, YYYY")
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
