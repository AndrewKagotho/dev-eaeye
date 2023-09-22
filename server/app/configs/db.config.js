require('dotenv').config()

module.exports = {
  HOST: process.env.HOST,
  DBPORT: process.env.DBPORT,
  DB: process.env.DB,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DIALECT: 'mysql',
  POOL: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
