'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')
const Post = use('App/Models/Post')
/**
 * Resourceful controller for interacting with posts
 */
const Post = use ('App/Model/Post')
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, auth }) {
    //const id_user = await auth.getUser()
    const posts = await Post
      .query()
      .with('user')
      .fetch()
    return (posts.toJSON())
    /*const posts = await user
      .posts()
      .fetch()*/
    //return await Database.select('*').from('posts')    
  }
}

module.exports = PostController
