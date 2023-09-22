const config = require('../configs/db.config')
const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  port: config.DBPORT,
  dialect: config.DIALECT,
  pool: {
    max: config.POOL.max,
    min: config.POOL.min,
    acquire: config.POOL.acquire,
    idle: config.POOL.idle
  }
})

const db = {}

db.sequelize = sequelize

db.book = require('./book.model')(sequelize, DataTypes)
db.member = require('./member.model')(sequelize, DataTypes)
db.issue = require('./issue.model')(sequelize, DataTypes)
db.return = require('./return.model')(sequelize, DataTypes)

db.book.belongsToMany(db.member, {
  through: db.issue
})

db.member.belongsToMany(db.book, {
  through: db.issue
})

module.exports = db
