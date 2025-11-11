const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(User, { through: ReadingList, as: "read_by_users" })
User.belongsToMany(Blog, { through: ReadingList, as: "readings" })

module.exports = {
  Blog, User, ReadingList
}