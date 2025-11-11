const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(User, { through: Readinglist, as: "read_by_users" })
User.belongsToMany(Blog, { through: Readinglist, as: "readings" })

module.exports = {
  Blog, User, Readinglist
}