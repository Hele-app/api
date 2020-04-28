'use strict'

// eslint-disable-next-line
const Region = use('App/Models/Region')

class RegionController {
  /**
   * Returns all regions with no search nor pagination
   * GET regions/all
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async all({ response }) {
    return response.status(200).json(await Region.all())
  }
}

module.exports = RegionController
