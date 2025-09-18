const BlogComment = ({ comments }) => {
  return (
    <div>
      <h3>comments</h3>
      <ul>
        {comments.map((c, id) => (
          <li key={id}>{c}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogComment
