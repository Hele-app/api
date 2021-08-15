'use strict'

import { Router } from 'express'
import { checkSchema } from 'express-validator'

import { validate } from '../commons/helpers/validators'
import { loggedIn, IsRole } from '../commons/middlewares'
import { store } from './validators'
import HttpController from './HttpController'
import upload from '../commons/helpers/pdfupload'

const storeSchema = checkSchema(store, ['body'])
const router = Router()

router.use(loggedIn)
router.get('/all', HttpController.all)
router.get('/', HttpController.index)
router.get('/:id', HttpController.show)
router.use(new IsRole('ADMIN'))
router.post('/', upload, HttpController.store)
router.put('/:id', validate(storeSchema), HttpController.update)
router.delete('/:id', HttpController.destroy)

export default router
