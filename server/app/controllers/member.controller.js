const db = require('../models')
const Member = db.member
const Op = require('sequelize').Op

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Body cannot be empty' })
    return
  }

  const member = {
    nationalId: req.body.nationalId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }

  Member.create(member)
    .then(() => {
      res.sendStatus(201)
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || 'Error creating member'
      })
    )
}

exports.findOne = (req, res) => {
  const nationalId = req.params.nationalId

  Member.findByPk(nationalId)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error retrieving member with National ID ${id}!`
      })
    })
}

exports.findAll = (req, res) => {
  let condition
  let queryString = req.query.item

  if (req.query.type === 'nationalId') {
    condition = queryString
      ? { nationalId: { [Op.like]: `%${queryString}%` } }
      : null
  } else if (req.query.type === 'firstName') {
    condition = queryString
      ? { firstName: { [Op.like]: `%${queryString}%` } }
      : null
  } else if (req.query.type === 'lastName') {
    condition = queryString
      ? { lastName: { [Op.like]: `%${queryString}%` } }
      : null
  }

  Member.findAll({ where: condition, raw: true })
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) =>
      res.status(404).send({
        message: err.message || 'Error retrieving member'
      })
    )
}

exports.update = (req, res) => {
  const nationalId = req.params.nationalId

  Member.update(req.body, {
    where: { nationalId: nationalId }
  })
    .then((data) => {
      if (data == 1) res.sendStatus(200)
      else
        res.send({
          message: `Could not update member with National ID ${nationalId}`
        })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error updating member with National ID ${nationalId}`
      })
    })
}

exports.delete = (req, res) => {
  const nationalId = req.params.nationalId

  Member.destroy({
    where: { nationalId: nationalId }
  })
    .then((data) => {
      if (data == 1) res.sendStatus(200)
      else
        res.send({
          message: `Could not delete member with National ID ${nationalId}`
        })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error deleting member with National ID ${nationalId}`
      })
    })
}
