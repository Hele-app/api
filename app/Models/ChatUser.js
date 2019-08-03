'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ChatUser extends Model {
  messages() {
    return this.hasMany('App/Models/Message')
  }
}

module.exports = ChatUser
