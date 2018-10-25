import React from 'react'
import { Layout } from 'components'

const BlogPost = ({ post: { title, description, date, html } }) => (
  <Layout title={title} description={description}>
    <section className='post'>
      <header className='post__header'>
        <span className='post__date'>{date}</span>
      </header>

      <article
        className='post__content'
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  </Layout>
)

export default BlogPost
