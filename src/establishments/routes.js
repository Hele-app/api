'use strict'

import { Router } from 'express'
import HttpController from './HttpController'
import { loggedIn, IsRole } from '../commons/middlewares'

const router = Router()

router.use(loggedIn, new IsRole('ADMIN'))
router.get('/all', HttpController.all)
router.get('/', HttpController.index)
router.get('/:id', HttpController.show)
router.post('/', HttpController.store)
router.put('/:id', HttpController.update)
router.delete('/:id', HttpController.destroy)

export default router
