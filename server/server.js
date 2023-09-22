const express = require('express'),
  app = express(),
  cors = require('cors'),
  path = require('path'),
  db = require('./app/models'),
  { initializeBooks, initializeMembers } = require('./app/utils/data.init')

const corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./client'))

try {
  ;(async () => {
    // Establish connection
    await db.sequelize.authenticate()
    console.log('> Connection established! \n> Syncing database...')

    // Sync db
    db.sequelize.sync().then(() => console.log('> Sync successful!'))

    // Alter db
    /* db.sequelize
    .sync({ alter: true })
    .then(() => console.log('Sync (alter) successful')) */

    // Reset db
    /* db.sequelize.sync({ force: true }).then(() => {
      console.log('> Sync (force) successful')
      initializeBooks()
      initializeMembers()
    }) */
  })()
} catch {
  console.log('Connection failed!')
}

require('./app/routes/book.routes')(app)
require('./app/routes/member.routes')(app)
require('./app/routes/issue.routes')(app)
require('./app/routes/return.routes')(app)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`> Server listening on port ${PORT}`)
})
