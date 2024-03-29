import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import Box from './Box'
import Flex from './Flex'
import Text from './Text'
import Heading from './Heading'

const Articles = ({ posts }) => {
  return posts.map(({ node: post }) => {
    const { frontmatter, fields, excerpt } = post
    const A = frontmatter.link ? 'a' : Link
    const link = frontmatter.link
      ? { href: frontmatter.link }
      : { to: fields.slug.replace(/\/$/, '') }

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
              mt={[3, 3, 0]}
              fontWeight='2'
              color='gray.300'
              textAlign='right'
            >
              {frontmatter.date}
            </Text>
          </Flex>
        </A>
      </Box>
    )
  })
}

export default Articles
