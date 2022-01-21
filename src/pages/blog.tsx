import React from 'react'
import { graphql } from 'gatsby'
import { Container, Flex, Heading, Section, Articles, Seo } from '../components'

const ArticlesPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <>
      <Seo title='Articles' />

      <Section>
        <Container
          as={Flex}
          flexDirection='column'
          justifyContent='center'
          alignItems='flex-start'
        >
          <Heading as='h2' fontFamily='heading' fontSize='8' mb='5'>
            All Articles
          </Heading>

          <Articles posts={posts} />
        </Container>
      </Section>
    </>
  )
}

export const query = graphql`
  query BlogQuery {
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

export default ArticlesPage
