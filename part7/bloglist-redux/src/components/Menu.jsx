import { Link } from 'react-router-dom'

import LoginInfo from './LoginInfo'

const Menu = () => {
  const menuStyle = {
    padding: '0.5em',
    background: '#00000040',
  }

  const linkPandding = {
    paddingRight: 5,
  }

  return (
    <div style={menuStyle}>
      <Link to="/" style={linkPandding}>
        blogs
      </Link>
      <Link to="/users" style={linkPandding}>
        users
      </Link>
      <LoginInfo />
    </div>
  )
}

export default Menu
