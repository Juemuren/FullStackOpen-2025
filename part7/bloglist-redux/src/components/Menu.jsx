import { Link } from 'react-router-dom'

import LoginInfo from './LoginInfo'

import { AppBar, Toolbar, Button } from '@mui/material'

const Menu = () => {
  // const menuStyle = {
  //   padding: '0.5em',
  //   background: '#00000040',
  // }

  // const linkPandding = {
  //   paddingRight: 5,
  // }

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <LoginInfo />
      </Toolbar>
    </AppBar>
  )
}

export default Menu
