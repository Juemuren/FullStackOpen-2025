import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const UserInfo = () => {
  const match = useMatch('/users/:id')
  const user = useSelector(({ users }) => users.find((u) => u.id === match.params.id))

  if (!user) {
    return null
  }

  const blogs = user.blogs

  return (
    <div>
      <h3>added blogs</h3>
      <ul>
        {blogs.map((b, id) => (
          <li key={id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserInfo
