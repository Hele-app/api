'use strict'

import { Router } from 'express'
import { checkSchema } from 'express-validator'
import { validate } from '../validators/'
import { schema as register } from '../validators/auth/register'
import AuthController from '../controllers/http/AuthController'

const registerSchema = checkSchema(register, ['body'])
const router = Router()

router.post('/register', validate(registerSchema), AuthController.register)

module.exports = router
