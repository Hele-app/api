'use strict'

import { Router } from 'express'
import PasswordController from '../controllers/http/PasswordController'
import { schema as request } from '../validators/password/request'
import { schema as reset } from '../validators/password/reset'
import { checkSchema } from 'express-validator'
import { validate } from '../validators/'

const requestSchema = checkSchema(request, ['body'])
const resetSchema = checkSchema(reset, ['body'])
const router = Router()

router.post('/request', validate(requestSchema), PasswordController.request)
router.post('/reset', validate(resetSchema), PasswordController.reset)

module.exports = router
