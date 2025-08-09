const Logout = ({ name, logout }) => {

  return (
  <div>
    {name} logged in
    <button onClick={logout}>logout</button>
  </div>
  )
}

export default Logout