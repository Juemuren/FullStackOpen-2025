import { Link } from 'react-router-dom'

import LoginInfo from './LoginInfo'

const Menu = () => {
  const menuStyle = {
    paddingRight: 5,
  }

  return (
    <div>
      <Link to="/" style={menuStyle}>
        blogs
      </Link>
      <Link to="/users" style={menuStyle}>
        users
      </Link>
      <LoginInfo />
    </div>
  )
}

export default Menu
