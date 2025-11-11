const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(User, { through: ReadingList, as: "read_by_users" })
User.belongsToMany(Blog, { through: ReadingList, as: "blog_reading_list" })

module.exports = {
  Blog, User, ReadingList
}