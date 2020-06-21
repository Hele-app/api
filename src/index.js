'use strict'

import 'dotenv/config'
import helmet from 'helmet'
import express from 'express'
import logger from 'morgan'

import homeRouter from './routes/home'
import authRouter from './routes/auth'

const app = express()

app.use(helmet())
app.use(logger(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', homeRouter)
app.use('/auth', authRouter)

module.exports = app
