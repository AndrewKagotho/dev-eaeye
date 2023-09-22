const router = require('express').Router()
const returnItem = require('../controllers/return.controller')

module.exports = (app) => {
  router.get('/returns', returnItem.findAll)
  router.post('/returns', returnItem.create)
  app.use('/api', router)
}
