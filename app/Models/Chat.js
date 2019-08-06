'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Chat extends Model {
  users() {
    return this
      .belongsToMany('App/Models/User')
      .pivotTable('chat_users')
  }

  messages() {
    return this.manyThrough('App/Models/ChatUser', 'messages')
  }
}

module.exports = Chat
