import React from 'react'

const CommentForm = ({ slug, href }) => (
  <div>
    <h3>Leave a Comment</h3>

    <form
      className='comment-form'
      method='POST'
      action='https://dev.staticman.net/v3/entry/github/iagodahlem/iagodahlem.com/master/comments'
    >
      <input name='options[redirect]' type='hidden' value={href} />
      <input name='fields[slug]' type='hidden' value={slug} />

      <div className='comment-form__contact'>
        <input className='input' name='fields[name]' type='text' placeholder='Name' required />
        <input className='input' name='fields[email]' type='email' placeholder='Email' required />
      </div>

      <div className='comment-form__message'>
        <textarea
          className='input'
          rows='3'
          name='fields[message]'
          placeholder='Your comment'
          required
        />
      </div>

      <div className='comment-form__footer'>
        <button className='button' type='submit'>
          Submit
        </button>
      </div>
    </form>
  </div>
)

export default CommentForm
