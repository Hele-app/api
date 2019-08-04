'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Message extends Model {
  user() {
    return this.manyThrough('App/Models/ChatUser', 'user', 'chat_user_id', 'id')
  }

  chat() {
    return this.manyThrough('App/Models/ChatUser', 'chat', 'chat_user_id', 'id')
  }

  chatUser() {
    return this.belongsTo('App/Models/ChatUser')
  }
}

module.exports = Message
