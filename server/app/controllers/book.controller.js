const db = require('../models')
const Book = db.book
const Op = require('sequelize').Op

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Body cannot be empty' })
    return
  }

  const book = {
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    fee: req.body.fee,
    quantity: req.body.quantity
  }

  Book.create(book)
    .then(() => {
      res.sendStatus(201)
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || 'Error creating book'
      })
    )
}

exports.findOne = (req, res) => {
  const isbn = req.params.isbn

  Book.findByPk(isbn)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving book with ISBN ${id}!`
      })
    })
}

exports.findAll = (req, res) => {
  let condition
  let queryString = req.query.item

  if (req.query.type === 'isbn') {
    condition = queryString ? { isbn: { [Op.like]: `%${queryString}%` } } : null
  } else if (req.query.type === 'title') {
    condition = queryString
      ? { title: { [Op.like]: `%${queryString}%` } }
      : null
  } else if (req.query.type === 'author') {
    condition = queryString
      ? { author: { [Op.like]: `%${queryString}%` } }
      : null
  }

  Book.findAll({ where: condition, raw: true })
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) =>
      res.status(404).send({
        message: err.message || 'Error retrieving book'
      })
    )
}

exports.update = (req, res) => {
  const isbn = req.params.isbn

  Book.update(req.body, {
    where: { isbn: isbn }
  })
    .then((data) => {
      if (data == 1) res.sendStatus(200)
      else
        res.send({
          message: `Could not update book with ISBN ${isbn}`
        })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error updating book with ISBN ${isbn}`
      })
    })
}

exports.delete = (req, res) => {
  const isbn = req.params.isbn

  Book.destroy({
    where: { isbn: isbn }
  })
    .then((data) => {
      if (data == 1) res.sendStatus(200)
      else
        res.send({
          message: `Could not delete book with ISBN ${isbn}`
        })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error deleting book with ISBN ${isbn}`
      })
    })
}
