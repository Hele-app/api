'use strict'

import { Router } from 'express'
import RegionController from '../controllers/http/RegionController'

const router = Router()

router.get('/all', RegionController.all)

module.exports = router
