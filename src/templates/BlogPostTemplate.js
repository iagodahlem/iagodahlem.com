import React from 'react'
import { graphql } from 'gatsby'
import { CommentForm, CommentList, Layout } from 'components'

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const { markdownRemark, allCommentsYaml } = data
  const { html, frontmatter } = markdownRemark
  const { title, description, date } = frontmatter
  const { slug } = pageContext
  const { href } = location

  return (
    <Layout title={title} description={description}>
      <section className='post'>
        <header className='post__header'>
          <span className='post__date'>{date}</span>
        </header>

        <article
          className='post__content'
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <hr />

        <footer className='post__footer'>
          {allCommentsYaml && (
            <CommentList comments={allCommentsYaml} />
          )}

          <CommentForm slug={slug} href={href} />
        </footer>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
      }
    }
    allCommentsYaml(
      filter: { slug: { eq: $slug } }
      sort: { fields: [date], order: DESC }
    ) {
      totalCount
      edges {
        node {
          id
          name
          message
          date(formatString: "MM/DD/YYYY")
        }
      }
    }
  }
`

export default BlogPostTemplate
