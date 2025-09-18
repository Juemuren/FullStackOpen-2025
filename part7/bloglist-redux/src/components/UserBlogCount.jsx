import { Link } from 'react-router-dom'

const UserBlogCount = ({ user }) => {
  return (
    <tr>
      <td>
        <Link to={user.id}>{user.name}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

export default UserBlogCount
