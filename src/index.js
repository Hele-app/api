'use strict'

import 'dotenv/config'
import helmet from 'helmet'
import express from 'express'
import logger from 'morgan'

import homeRouter from './home/routes'
import authRouter from './auth/routes'
import passwordRouter from './password/routes'
import regionRouter from './regions/routes'
import establishmentRouter from './establishments/routes'
import mapRouter from './map/routes'

const app = express()

app.use(helmet())
app.use(logger(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', homeRouter)
app.use('/auth', authRouter)
app.use('/auth/password', passwordRouter)
app.use('/region', regionRouter)
app.use('/establishment', establishmentRouter)
app.use('/map', mapRouter)

module.exports = app
