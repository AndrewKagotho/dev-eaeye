const db = require('../models')
const Issue = db.issue
const Book = db.book
const Op = require('sequelize').Op

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Body cannot be empty' })
    return
  }

  const issue = {
    bookIsbn: req.body.bookIsbn,
    memberNationalId: req.body.memberNationalId
  }

  Issue.create(issue)
    .then(() => {
      Book.findByPk(issue.bookIsbn)
        .then((data) => {
          const updatedBook = {
            quantity: data.dataValues.quantity - 1
          }
          Book.update(updatedBook, {
            where: { isbn: issue.bookIsbn }
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
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || `Error retrieving book with ID ${id}!`
          })
        })
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || 'Error issuing book'
      })
    )
}

exports.findOne = (req, res) => {
  const issueId = req.params.issueId

  Issue.findByPk(issueId)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving issue with ID ${id}!`
      })
    })
}

exports.findAll = (req, res) => {
  let condition
  let queryString = req.query.item

  if (req.query.type === 'issueId') {
    condition = queryString
      ? { issueId: { [Op.like]: `%${queryString}%` } }
      : null
  } else if (req.query.type === 'bookIsbn') {
    condition = queryString
      ? { bookIsbn: { [Op.like]: `%${queryString}%` } }
      : null
  } else if (req.query.type === 'memberNationalId') {
    condition = queryString
      ? { memberNationalId: { [Op.like]: `%${queryString}%` } }
      : null
  }

  Issue.findAll({ where: condition, raw: true })
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) =>
      res.status(404).send({
        message: err.message || 'Error finding issue'
      })
    )
}
