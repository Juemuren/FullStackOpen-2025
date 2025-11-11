const router = require('express').Router()

const { tokenExtractor } = require('../util/middleware')
const { User, Readinglist } = require('../models')

router.post('/', async (req, res, next) => {
  try {
    const entry = await Readinglist.create(req.body)
    res.json(entry)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const entry = await Readinglist.findByPk(req.params.id)
    if (user.id === entry.userId) {
      entry.read = req.body.read
      await entry.save()
      res.json(entry)
    } else {
      res.status(401).json({ error: 'permission denied' })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router