import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { showNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const userObject = {
      username: username,
      password: password,
    }

    try {
      await dispatch(login(userObject))
      // eslint-disable-next-line no-unused-vars
    } catch (exception) {
      dispatch(showNotification('wrong username or password', 5, 'error'))
    }

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>login in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            data-testid="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            data-testid="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
