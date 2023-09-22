const router = require('express').Router()
const issue = require('../controllers/issues.controller')

module.exports = (app) => {
  router.get('/issues', issue.findAll)
  router.get('/issues/:issueId', issue.findOne)
  router.post('/issues', issue.create)
  app.use('/api', router)
}
