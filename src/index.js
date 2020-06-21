'use strict'

import 'dotenv/config'
import helmet from 'helmet'
import express from 'express'
import logger from 'morgan'

const app = express()

app.use(helmet())
app.use(logger(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./routes/home'))
app.use('/auth', require('./routes/auth'))
app.use('/auth/password', require('./routes/password'))
app.use('/region', require('./routes/region'))

module.exports = app
