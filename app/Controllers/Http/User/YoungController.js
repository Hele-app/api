'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

// eslint-disable-next-line
const env = use('Env').get('NODE_ENV', 'development')

// eslint-disable-next-line
const User = use('App/Models/User')

// eslint-disable-next-line
const Establishment = use('App/Models/Establishment')

// eslint-disable-next-line
const { sendSMS } = use('App/Helpers/Authentication')

// eslint-disable-next-line
const { generatePassword } = use('App/Helpers/Random')

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
  async index({ request, response }) {
    let query = User.query()

    if (request.input('q')) {
      const q = request.input('q')
      query = query.where(function () {
        this
          .where('phone', q)
          .orWhere('username', 'like', `%${q}%`)
      })
    }

    const users = await query.isYoung().paginate(request.input('p', 1))
    return response.status(200).json(users)
  }

  /**
   * Create/save a new young.
   * POST youngs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const password = generatePassword()
    const data = request.only(['phone', 'username', 'birthyear'])
    data.password = password

    const code = request.input('establishment_code')
    const establishment = Establishment.findByOrFail('code', code)

    const user = await User.make(data)
    user.establishment().associate(establishment)

    await user.save()

    /* istanbul ignore next */
    if (env === 'production') {
      // TODO: text should be generated from a package and not from an hardcoded unlocalised string
      sendSMS(`Salut ${user.username} !\nBienvenu sur Hélé. Ton mot de passe pour te connecter est ${password}.\nA bientôt sur Hélé !`, user.phone)
      return response.status(201).json({})
    }
    return response.status(201).json({ user, password })
  }

  /**
   * Display a single young.
   * GET youngs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) {
    const user = await User.query().isYoung().where('id', params.id)
      .firstOrFail()
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
  async update({ params, request, response }) {
    const user = await User.query().isYoung().where('id', params.id)
      .firstOrFail()

    const data = request.only(['phone', 'username', 'active', 'role',
      'birthyear'])
    user.merge(data)

    if (request.input('establishment_code')) {
      const code = request.input('establishment_code')
      const establishment = await Establishment.findByOrFail('code', code)
      user.establishment().associate(establishment)
    }
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
  async destroy({ params, request, response }) {
    const user = await User.query().isYoung().where('id', params.id)
      .firstOrFail()
    await user.delete()
    return response.status(204).send()
  }
}

module.exports = YoungController
