import { useDispatch } from 'react-redux'

import { commentBlog } from '../reducers/blogReducer'

import { Input, Button, List, ListItem } from '@mui/material'

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
        <Input name="comment" />
        <Button type="submit">add comment</Button>
      </form>
      <List>
        {comments.map((c, id) => (
          <ListItem key={id}>{c.content}</ListItem>
        ))}
      </List>
    </div>
  )
}

export default BlogComment
