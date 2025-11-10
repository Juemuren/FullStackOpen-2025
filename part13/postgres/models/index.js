const Blog = require('./blog')
const User = require('./user')

User.hasMany(Blog)
Blog.belongsTo(User)
// Blog.sync({ alter: true })
// User.sync({ alter: true })
Blog.sync()
User.sync()

module.exports = {
  Blog, User
}