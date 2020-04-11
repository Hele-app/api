'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Role {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, response }, next, properties) {
    const role = properties.length ? properties.shift().toUpperCase() : 'ADMIN'
    const user = await auth.getUser()

    if (user.role !== role) {
      console.error(role, user.toJSON)
      return response.status(401).json({
        status: 401,
        errors: [{ message: `E_${role}_ONLY` }]
      })
    }

    // call next to advance the request
    await next()
  }

  checkRole(user, role) {

  }
}

module.exports = Role
