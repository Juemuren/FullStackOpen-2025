import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Bloglist from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserView from './components/UserView'

import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initBlogs())
  })

  useEffect(() => {
    dispatch(initUser())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <h2>blogs</h2>
          <Logout name={user.name} />
          {blogForm()}
          <Bloglist user={user} />
        </div>
      )}
      <UserView />
    </div>
  )
}

export default App
