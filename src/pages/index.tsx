import React from 'react'
import { motion } from 'framer-motion'
import { graphql } from 'gatsby'
import {
  Container,
  Box,
  Flex,
  Text,
  Heading,
  Link,
  Nav,
  Section,
} from '../components'

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <>
      <Section>
        <Container
          as={Flex}
          flexDirection='column'
          justifyContent='center'
          alignItems='flex-start'
        >
          <Heading fontSize='6' fontWeight='2' pb='5'>
            Iago Dahlem Lorensini
          </Heading>

          <Text
            fontFamily='heading'
            fontSize='7'
            fontWeight='4'
            lineHeight='4rem'
            pb='5'
          >
            Hi! 👋 I'm Iago.
            <br />A software engineer from Brazil.
            <br />
            I'm currently working at Codeminer42.
          </Text>

          <Nav />
        </Container>
      </Section>

      <Section>
        <Container
          as={Flex}
          flexDirection='column'
          justifyContent='center'
          alignItems='flex-start'
        >
          <Heading as='h2' fontFamily='heading' fontSize='7' mb='5'>
            Latest Articles
          </Heading>

          {posts.map(({ node: post }) => {
            const { frontmatter, fields } = post
            const link = frontmatter.link
              ? { as: 'a', href: frontmatter.link }
              : { to: fields.slug }

            return (
              <Box key={post.id} width={1}>
                <Link {...link}>
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
                </Link>
              </Box>
            )
          })}
        </Container>
      </Section>
    </>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
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
