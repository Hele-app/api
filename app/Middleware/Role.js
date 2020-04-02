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
    try {
      await this.checkRole(auth, role)
    } catch (e) {
      console.error(e, role, await auth.getUser().toJson())
      return response.status(401).json({
        status: 401,
        errors: [{ message: `E_${role}_ONLY` }]
      })
    }
    // call next to advance the request
    await next()
  }

  async checkRole(auth, role) {
    const user = await auth.getUser()
    if (user.role !== role) {
      throw new Error(`${user.role} != ${role}`)
    }
  }
}

module.exports = Role
