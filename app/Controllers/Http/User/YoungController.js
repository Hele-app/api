'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

// eslint-disable-next-line
const User = use('App/Models/User')

// eslint-disable-next-line
const AuthenticationController = use('App/Controllers/Http/AuthenticationController')

/**
 * Resourceful controller for interacting with youngs
 */
class YoungController {
  /**
   * Show a list of all youngs.
   * GET youngs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index ({ request, response }) {
    let query = User.query()

    if (request.input('q')) {
      const q = request.input('q')
      query = query.where(function () {
        this
          .where('phone', q)
          .orWhere('username', 'like', `%${q}%`)
      })
    }

    return response.status(200).json(await query.isYoung().paginate(request.input('p', 1)))
  }

  /**
   * Create/save a new young.
   * POST youngs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    return (new AuthenticationController).register({ request, response })
  }

  /**
   * Display a single young.
   * GET youngs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show ({ params, request, response }) {
    const user = await User.query().isYoung().where('id', params.id).firstOrFail()
    return response.status(200).json(user)
  }

  /**
   * Update young details.
   * PUT or PATCH youngs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const user = await User.query().isYoung().where('id', params.id).firstOrFail()
    user.phone = phone
    user.username = request.input('username')
    user.establishment().associate(await Establishment.findByOrFail('code', code))
    user.birthyear = new Date().getFullYear() - request.input('age')
    user.active = request.input('active', true)
    user.role = request.input('role', 'YOUNG')
    await user.save()
    return response.status(200).json(user)
  }

  /**
   * Delete a young with id.
   * DELETE youngs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const user = await User.query().isYoung().where('id', params.id).firstOrFail()
    await user.delete()
    return response.status(204).send()
  }
}

module.exports = YoungController
