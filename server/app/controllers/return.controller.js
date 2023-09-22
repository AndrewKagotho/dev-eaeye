const db = require('../models')
const Return = db.return
const Book = db.book
const Issue = db.issue
const Op = require('sequelize').Op

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Body cannot be empty' })
    return
  }

  const returnItem = {
    issueId: req.body.issueId,
    pay: req.body.pay,
    bookIsbn: req.body.bookIsbn,
    memberNationalId: req.body.memberNationalId,
    issuedDate: req.body.issuedDate
  }

  Return.create(returnItem)
    .then(() => {
      Issue.findByPk(returnItem.issueId)
        .then(() => {
          Book.findByPk(returnItem.bookIsbn)
            .then((data) => {
              const updatedBook = {
                quantity: data.dataValues.quantity + 1
              }
              Book.update(updatedBook, {
                where: { isbn: data.dataValues.isbn }
              })
                .then((data) => {
                  if (data == 1) {
                    Issue.destroy({
                      where: { issueId: returnItem.issueId }
                    })
                      .then((data) => {
                        if (data == 1) {
                          res.sendStatus(200)
                        } else
                          res.send({
                            message: `Could not delete book with ISBN ${isbn}`
                          })
                      })
                      .catch((err) => {
                        res.status(500).send({
                          message:
                            err.message ||
                            `Error deleting book with ISBN ${isbn}`
                        })
                      })
                  } else
                    res.send({
                      message: `Could not update book with ISBN ${isbn}`
                    })
                })
                .catch((err) => {
                  res.status(500).send({
                    message:
                      err.message || `Error updating book with ISBN ${isbn}`
                  })
                })
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || `Error retrieving book with ID ${id}!`
              })
            })
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || `Error retrieving issue with ID ${id}!`
          })
        })
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || 'Error entering return'
      })
    )
}

exports.findAll = (req, res) => {
  let condition
  let queryString = req.query.item

  if (req.query.type === 'returnId') {
    condition = queryString
      ? { returnId: { [Op.like]: `%${queryString}%` } }
      : null
  } else if (req.query.type === 'issueIssueId') {
    condition = queryString
      ? { issueIssueId: { [Op.like]: `%${queryString}%` } }
      : null
  }

  Return.findAll({ where: condition, raw: true })
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) =>
      res.status(404).send({
        message: err.message || 'Error finding issue'
      })
    )
}
