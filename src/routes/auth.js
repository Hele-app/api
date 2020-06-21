'use strict'

import { Router } from 'express'
import { checkSchema } from 'express-validator'
import { validate } from '../validators/'
import { schema as register } from '../validators/auth/register'
import { schema as login } from '../validators/auth/login'
import AuthController from '../controllers/http/AuthController'

const registerSchema = checkSchema(register, ['body'])
const loginSchema = checkSchema(login, ['body'])
const router = Router()

router.post('/register', validate(registerSchema), AuthController.register)
router.post('/login', validate(loginSchema), AuthController.login)

module.exports = router
