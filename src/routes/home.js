'use strict'

import { Router } from 'express'
import HomeController from '../controllers/http/HomeController'

const router = Router()

router.get('/', HomeController.index)

module.exports = router
