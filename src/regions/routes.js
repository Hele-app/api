'use strict'

import { Router } from 'express'
import HttpController from './HttpController'
import { loggedIn } from '../commons/middlewares'

const router = Router()

router.use(loggedIn)
router.get('/all', HttpController.all)

export default router
