'use strict'

import { Router } from 'express'
import { checkSchema } from 'express-validator'

import { validate } from '../commons/helpers/validators'
import { loggedIn, IsRole } from '../commons/middlewares'
import { store } from './validators'
import HttpController from './HttpController'

const storeSchema = checkSchema(store, ['body'])
const router = Router()

router.get('/all', HttpController.all)
router.get('/', HttpController.index)
router.get('/:id', HttpController.show)
router.use(loggedIn, new IsRole('ADMIN'))
router.post('/', validate(storeSchema), HttpController.store)
router.put('/:id', validate(storeSchema), HttpController.update)
router.delete('/:id', HttpController.destroy)

export default router
