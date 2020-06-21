'use strict'

import db from '../../../config/database'

export default class RegionController {
  /**
   * Returns all regions with no search nor pagination
   * GET regions/all
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  static async all(req, res, next) {
    const regions = await db('regions').select('*')
    return res.json(regions)
  }
}
