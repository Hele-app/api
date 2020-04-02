'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

// eslint-disable-next-line
const env = use('Env').get('NODE_ENV', 'development')

// eslint-disable-next-line
const User = use('App/Models/User')

// eslint-disable-next-line
const { generatePassword, sendSMS } = use('App/Helpers/Authentication')

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
  async index ({ request, response }) {
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
    return response.status(200).json(await query.isPro().paginate(request.input('p', 1)))
  }

  /**
   * Create/save a new pro.
   * POST pros
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const password = generatePassword()

    const user = await User.create({
      phone: request.input('phone'),
      username: request.input('username'),
      establishment_id: null,
      birthyear: request.input('birthyear'),
      password: password,
      email: request.input('email'),
      role: request.input('role', 'PROFESSIONAL'),
      profession: request.input('profession'),
      city: request.input('city'),
      phone_pro: request.input('phone_pro')
    })

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
  async show ({ params, request, response }) {
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
  async update ({ params, request, response }) {
    const user = await User.query().isPro().where('id', params.id).firstOrFail()

    user.phone = request.input('phone')
    user.username = request.input('username')
    user.birthyear = request.input('birthyear')
    user.email = request.input('email')
    user.role = request.input('role', 'PROFESSIONAL')
    user.profession = request.input('profession')
    user.city = request.input('city')
    user.phone_pro = request.input('phone_pro')
    user.active = request.input('active', true)
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
  async destroy ({ params, request, response }) {
    const user = await User.query().isPro().where('id', params.id).firstOrFail()
    await user.delete()
    return response.status(204).send()
  }
}

module.exports = ProController
