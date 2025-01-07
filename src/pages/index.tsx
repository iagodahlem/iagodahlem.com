import React from 'react'
import { graphql } from 'gatsby'
import { motion } from 'framer-motion'
import {
  Articles,
  Container,
  Flex,
  Heading,
  Nav,
  Section,
  Seo,
  Text,
} from '../components'

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <>
      <Seo title='Home' />

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
            I'm currently working at{' '}
            <Text
              as={motion.a}
              href='https://clerk.com'
              whileHover={{ opacity: 0.6 }}
            >
              Clerk.com
            </Text>
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

          <Articles posts={posts} />
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
