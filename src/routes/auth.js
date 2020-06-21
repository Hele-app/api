'use strict'

import { Router } from 'express'
import { checkSchema } from 'express-validator'
import { validate } from '../validators/'
import { schema as register } from '../validators/auth/register'
import AuthController from '../controllers/http/AuthController'

const router = Router()
router.post('/register', validate(checkSchema(register)),
  AuthController.register)

module.exports = router
