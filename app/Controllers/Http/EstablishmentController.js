'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

// eslint-disable-next-line
const Establishment = use('App/Models/Establishment')

// eslint-disable-next-line
const Region = use('App/Models/Region')

// eslint-disable-next-line
const { generateEstablishmentCode } = use('App/Helpers/Random')

/**
 * Resourceful controller for interacting with establishments
 */
class EstablishmentController {
  /**
   * Show a list of all establishments.
   * GET establishments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    // Init the query
    let query = Establishment.query()

    // If a query is present, specify your where clauses in a non-arrow closure
    if (request.input('q')) {
      const q = request.input('q')
      query = query.where(function () {
        this
          .where('code', q)
          .orWhere('name', 'like', `%${q}%`)
      })
    }

    // Finalize the query and paginate with default size (20)
    const establishments = await query.paginate(request.input('p', 1))
    return response.status(200).json(establishments)
  }

  /**
   * Create/save a new establishment.
   * POST establishments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    let code = generateEstablishmentCode()

    while (Establishment.findBy('code', code) === null) {
      code = generateEstablishmentCode()
    }

    const data = request.only(['name', 'region_id'])
    data.code = code

    const establishment = await Establishment.create(data)

    return response.status(201).json(establishment)
  }

  /**
   * Display a single establishment.
   * GET establishments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) {
    const establishment = await Establishment.findOrFail(params.id)

    return response.status(200).json(establishment)
  }

  /**
   * Update establishment details.
   * PUT or PATCH establishments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const newData = request.only(['name', 'region_id'])

    const establishment = await Establishment.findOrFail(params.id)
    establishment.merge(newData)
    await establishment.save()

    return response.status(200).json(establishment)
  }

  /**
   * Delete a establishment with id.
   * DELETE establishments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const establishment = await Establishment.findOrFail('id', params.id)
    await establishment.delete()

    return response.status(204).send()
  }
}

module.exports = EstablishmentController
