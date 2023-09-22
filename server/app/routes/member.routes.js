const router = require('express').Router()
const member = require('../controllers/member.controller')

module.exports = (app) => {
  router.get('/members', member.findAll)
  router.get('/members/:nationalId', member.findOne)
  router.post('/members', member.create)
  router.put('/members/:nationalId', member.update)
  router.delete('/members/:nationalId', member.delete)
  app.use('/api', router)
}
