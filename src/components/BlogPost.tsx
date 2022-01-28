import React from 'react'
import { graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import Box from './Box'
import Flex from './Flex'
import Section from './Section'
import Container from './Container'
import Text from './Text'
import Heading from './Heading'
import Seo from './Seo'

const GlobalStyle = createGlobalStyle`
  .BlogPost {
    h1 {
      font-size: ${themeGet('fontSizes.8')}px;
    }
    h2 {
      font-size: ${themeGet('fontSizes.7')};
    }
    h3 {
      font-size: ${themeGet('fontSizes.6')};
    }

    p,ul,li,ol,blockquote,pre,table,th,td,tr,dl,dt,dd,form,fieldset,legend,address {
      font-size: ${themeGet('fontSizes.5')};
      line-height: 1.5;
      color: ${themeGet('colors.gray.200')};
    }

    h1,h2,h3,h4,h5,h6 {
      margin-top: ${themeGet('space.5')}px;
      margin-bottom: 0;
    }

    p, ul, ol, blockquote, table, dl, dt, dd,
    .gatsby-highlight pre {
      margin-top: ${themeGet('space.4')}px;
      margin-bottom: 0;
    }
  }
`

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const { markdownRemark } = data
  const { html, frontmatter } = markdownRemark
  const { title, description, date } = frontmatter

  return (
    <>
      <GlobalStyle />

      <Seo
        title={title}
        description={description}
        pathname={location.pathname}
      />

      <Section>
        <Container>
          <Flex as='header' flexDirection='column' alignItems='center' mb='5'>
            <Heading
              as='h2'
              mb='3'
              fontFamily='heading'
              fontSize='8'
              textAlign='center'
            >
              {title}
            </Heading>

            <Text fontSize='5' color='gray.300'>
              {date}
            </Text>
          </Flex>

          <Box
            as='article'
            className='BlogPost'
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Container>
      </Section>
    </>
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
    # allCommentsYaml(
    #   filter: { slug: { eq: $slug } }
    #   sort: { fields: [date], order: DESC }
    # ) {
    #   totalCount
    #   edges {
    #     node {
    #       id
    #       name
    #       message
    #       date(formatString: "MM/DD/YYYY")
    #     }
    #   }
    # }
  }
`

export default BlogPostTemplate
