const router = require('express').Router()

const { Session } = require('../models')

router.delete('/:id', async (req, res, next) => {
  try {
    await Session.destroy({
      where: {
        userId: req.params.id
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }

})

module.exports = router