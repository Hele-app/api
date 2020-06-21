'use strict'

import { Router } from 'express'
import { loggedIn, IsRole } from '../middlewares/auth'
import HomeController from '../controllers/http/HomeController'

const router = Router()

router.get('/', loggedIn, new IsRole('YOUNG'), HomeController.index)

module.exports = router
