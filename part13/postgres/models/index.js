const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

Blog.belongsToMany(User, { through: Readinglist, as: "read_by_users" })
User.belongsToMany(Blog, { through: Readinglist, as: "readings" })

User.hasMany(Session);
Session.belongsTo(User);

module.exports = {
  Blog, User, Readinglist, Session
}