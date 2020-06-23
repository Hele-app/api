'use strict'

import { Router } from 'express'
import { checkSchema } from 'express-validator'
import { validate } from '../commons/helpers'
import { request, reset } from './validators'
import HttpController from './HttpController'

const requestSchema = checkSchema(request, ['body'])
const resetSchema = checkSchema(reset, ['body'])
const router = Router()

router.post('/request', validate(requestSchema), HttpController.request)
router.post('/reset', validate(resetSchema), HttpController.reset)

export default router
