import React from 'react'
import { CommentForm, Layout } from 'components'

const BlogPost = ({ post: { title, description, date, html, slug }, href }) => (
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
        <h3>Leave a Comment</h3>

        <CommentForm slug={slug} href={href} />
      </footer>
    </section>
  </Layout>
)

export default BlogPost
