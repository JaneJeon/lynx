require('./config')
require('express-async-errors')

const express = require('express')
const app = express()
const passport = require('./config/passport')

module.exports = app
  .use(require('./middlewares/access-logger'))
  .use(require('express-request-id')())
  .use(require('./middlewares/express-logger'))
  .use(require('helmet')())
  .use(require('cors')({ origin: process.env.FRONTEND_URL }))
  .use(require('./middlewares/session'))
  .use(express.json())
  .use(require('express-query-boolean')())
  .use(passport.initialize())
  .use(passport.session())
  .use(passport.authenticate('remember-me'))
  .use(require('./routes'))
  .use((req, res) => res.sendStatus(404))
  .use(require('./middlewares/error-handler'))
