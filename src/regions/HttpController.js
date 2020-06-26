'use strict'

import { Region } from '../commons/models'

export default class RegionController {
  static async all(req, res) {
    const regions = await Region.fetchAll()
    return res.json({ results: regions })
  }
}
