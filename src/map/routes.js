'use strict'

import { Router } from 'express'
import { checkSchema } from 'express-validator'
import { validate } from '../commons/helpers'
import { store } from './validators'
import { loggedIn } from '../commons/middlewares'
import { IsRole } from '../commons/middlewares/auth'
import HttpController from './HttpController'

const storeSchema = checkSchema(store, ['body'])
const router = Router()

router.use(loggedIn)
router.get('/region/:id', HttpController.getRegion)
router.get('/', new IsRole('ADMIN'), HttpController.index)
router.post('/', new IsRole('ADMIN'), validate(storeSchema), HttpController.store)
router.put('/:id', new IsRole('ADMIN'), validate(storeSchema), HttpController.update)
router.delete('/:id', new IsRole('ADMIN'), HttpController.destroy)

export default router
