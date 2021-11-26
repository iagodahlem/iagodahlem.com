import React from 'react'
import { graphql } from 'gatsby'
import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import { Container, Box, Flex, Text, Heading, Section } from '../components'

const ArticlesPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Section>
      <Container
        as={Flex}
        flexDirection='column'
        justifyContent='center'
        alignItems='flex-start'
      >
        <Heading as='h2' fontFamily='heading' fontSize='7' mb='5'>
          All Articles
        </Heading>

        {posts.map(({ node: post }) => {
          const { frontmatter, fields, excerpt } = post
          const A = frontmatter.link ? 'a' : Link
          const link = frontmatter.link
            ? { href: frontmatter.link }
            : { to: fields.slug }

          return (
            <Box key={post.id} width={1}>
              <A {...link}>
                <Flex
                  as={motion.div}
                  flexDirection={['column', 'column', 'row']}
                  justifyContent='space-between'
                  alignItems={['flex-start', 'flex-start', 'center']}
                  py='4'
                  whileHover={{
                    opacity: 0.6,
                  }}
                >
                  <Heading as='h3' fontSize='6' fontWeight='3'>
                    {frontmatter.title}
                  </Heading>

                  <Text
                    fontSize='5'
                    fontWeight='2'
                    mt={[3, 3, 0]}
                    opacity='0.7'
                  >
                    {frontmatter.date}
                  </Text>
                </Flex>
              </A>
            </Box>
          )
        })}
      </Container>
    </Section>
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
