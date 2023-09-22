const router = require('express').Router()
const book = require('../controllers/book.controller')

module.exports = (app) => {
  router.get('/books', book.findAll)
  router.get('/books/:isbn', book.findOne)
  router.post('/books', book.create)
  router.put('/books/:isbn', book.update)
  router.delete('/books/:isbn', book.delete)
  app.use('/api', router)
}
