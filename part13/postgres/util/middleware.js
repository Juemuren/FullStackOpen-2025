const jwt = require('jsonwebtoken')

const { SECRET } = require('./config')
const { Session } = require('../models')

const errorHandle = (error, req, res, next) => {
  console.error(error)

  switch (error.name) {
    case 'SequelizeDatabaseError':
      return res.status(404).json({ error: 'type error' })
    case 'SequelizeValidationError':
      return res.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const token = authorization.substring(7)
      const session = await Session.findOne({
        where: { token }
      })
      if (session.expiresAt > new Date()) {
        req.decodedToken = jwt.verify(token, SECRET)
      } else {
        return res.status(401).json({ error: 'token expired' })
      }
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  errorHandle,
  tokenExtractor
}