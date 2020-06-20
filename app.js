import express from 'express'
import morgan from 'morgan'
import 'dotenv/config'

const indexRouter = require('./routes/index')

const app = express()

app.use(morgan(process.env.NODE_ENV === 'dev' ? 'dev' : 'combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)

module.exports = app
