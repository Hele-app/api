'use strict'

import { Router } from 'express'
import HttpController from './HttpController'

const router = Router()

router.get('/', HttpController.index)

export default router
