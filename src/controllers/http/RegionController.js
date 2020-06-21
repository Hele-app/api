'use strict'

import db from '../../../config/database'

export default class RegionController {
  static async all(req, res) {
    const regions = await db('regions').select('*')
    return res.json(regions)
  }
}
