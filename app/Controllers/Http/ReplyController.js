'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')
const Reply = use('App/Models/Reply')
/**
 * Resourceful controller for interacting with replies
 */

class ReplyController {
	/**
   * Show a list of all replies.
   * GET replies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {
    const replies = await Reply
      .query()
      .with('user')
      .with('post')
      .fetch()
    return (replies.toJSON())
  }
}

module.exports = ReplyController
