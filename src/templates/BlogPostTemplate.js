import React from 'react'
import { graphql } from 'gatsby'
import { BlogPost } from 'components'

const BlogPostTemplate = ({ data, pathContext, location }) => {
  const { markdownRemark } = data
  const { html, frontmatter } = markdownRemark
  const { title, description, date } = frontmatter
  const { slug } = pathContext
  const { href } = location

  const post = {
    title,
    description,
    date,
    html,
    slug,
  }

  return (
    <BlogPost post={post} href={href} />
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

export default BlogPostTemplate
