'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

// eslint-disable-next-line
const env = use('Env').get('NODE_ENV', 'development')

// eslint-disable-next-line
const User = use('App/Models/User')

// eslint-disable-next-line
const { sendSMS } = use('App/Helpers/Authentication')

// eslint-disable-next-line
const { generatePassword } = use('App/Helpers/Random')

/**
 * Resourceful controller for interacting with pros
 */
class ProController {
  /**
   * Show a list of all pros.
   * GET pros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  /* istanbul ignore next */
  async index({ request, response }) {
    // Init the query
    let query = User.query()

    // If a query is present, specify your where clauses in a non-arrow closure
    if (request.input('q')) {
      const q = request.input('q')
      query = query.where(function () {
        this
          .where('phone', q)
          .orWhere('username', 'like', `%${q}%`)
          .orWhere('email', 'like', `%${q}%`)
          .orWhere('profession', 'like', `%${q}%`)
          .orWhere('role', q.toUpperCase())
      })
    }

    // Finalize the query and paginate with default size (20)
    const users = await query.isPro().paginate(request.input('p', 1))
    return response.status(200).json(users)
  }

  /**
   * Create/save a new pro.
   * POST pros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const password = generatePassword()
    const data = request.only(['phone', 'username', 'birthyear', 'email',
      'profession', 'city', 'phone_pro'])
    data.role = request.input('role', 'PROFESSIONAL')
    data.password = password

    const user = await User.create(data)

    /* istanbul ignore next */
    if (env === 'production') {
      // TODO: text should be generated from a package and not from an hardcoded unlocalised string
      sendSMS(`Bonjour ${user.username} !\nBienvenu sur Hélé. Votre mot de passe pour vous connecter est ${password}.`, user.phone)
      return response.status(201).json({})
    }
    return response.status(201).json({ user, password })
  }

  /**
   * Display a single pro.
   * GET pros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  /* istanbul ignore next */
  async show({ params, request, response }) {
    const user = await User.query().isPro().where('id', params.id).firstOrFail()
    return response.status(200).json(user)
  }

  /**
   * Update pro details.
   * PUT or PATCH pros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const user = await User.query().isPro().where('id', params.id).firstOrFail()
    const data = request.only(['phone', 'username', 'birthyear', 'email',
      'role', 'profession', 'city', 'phone_pro', 'active'])

    user.merge(data)
    await user.save()

    return response.status(200).json(user)
  }

  /**
   * Delete a pro with id.
   * DELETE pros/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  /* istanbul ignore next */
  async destroy({ params, request, response }) {
    const user = await User.query().isPro().where('id', params.id).firstOrFail()
    await user.delete()
    return response.status(204).send()
  }
}

module.exports = ProController
