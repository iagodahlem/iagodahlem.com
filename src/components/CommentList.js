import React from 'react'

const CommentList = ({ comments }) => (
  <div>
    <h3>
      {comments.totalCount} {comments.totalCount === 1 ? 'Comment' : 'Comments'}
    </h3>

    {comments.edges.map(({ node: comment }) => (
      <div className='comment' key={comment.id}>
        <header className='comment__header'>
          <h4 className='comment__title'>
            {comment.name}
          </h4>

          <time className='comment__date'>{comment.date}</time>
        </header>

        <p className='comment__message'>{comment.message}</p>
      </div>
    ))}
  </div>
)

export default CommentList
