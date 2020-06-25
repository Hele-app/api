'use strict'

import { Router } from 'express'
import { loggedIn, IsRole } from '../commons/middlewares'
import HttpController from './HttpController'

const router = Router()

router.get('/', loggedIn, new IsRole('YOUNG'), HttpController.index)

export default router
