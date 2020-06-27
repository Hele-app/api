'use strict'

import { Router } from 'express'
import { checkSchema } from 'express-validator'

import { validate } from '../commons/helpers/validators'
import { loggedIn } from '../commons/middlewares/auth'
import { register, login } from './validators'
import HttpController from './HttpController'

const registerSchema = checkSchema(register, ['body'])
const loginSchema = checkSchema(login, ['body'])
const router = Router()

router.post('/register', validate(registerSchema), HttpController.register)
router.post('/login', validate(loginSchema), HttpController.login)
router.get('/me', loggedIn, HttpController.check)

export default router
