import { useDispatch } from 'react-redux'

import { commentBlog } from '../reducers/blogReducer'

const BlogComment = ({ id, comments }) => {
  const dispatch = useDispatch()

  const addComment = (event) => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.comment.value = ''
    dispatch(commentBlog(id, content))
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input name="comment" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map((c, id) => (
          <li key={id}>{c.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogComment
