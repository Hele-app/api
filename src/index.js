'use strict'

import 'dotenv/config'
import express from 'express'
import logger from 'morgan'

const homeRouter = require('./routes/home')

const app = express()

app.use(logger(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', homeRouter)

module.exports = app
