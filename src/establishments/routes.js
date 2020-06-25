'use strict'

import { Router } from 'express'
import HttpController from './HttpController'
import { loggedIn, IsRole } from '../commons/middlewares'

const router = Router()

router.use(loggedIn, new IsRole('ADMIN'))
router.get('/all', HttpController.all)
router.get('/', HttpController.index)
// router.get('/:id', EstablishmentController.show)
// router.post('/', EstablishmentController.store)
// router.put('/:id', EstablishmentController.update)
// router.delete('/:id', EstablishmentController.destroy)

export default router
