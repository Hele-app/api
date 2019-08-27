'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ChatUser extends Model {

  static get createdAtColumn() {
    return undefined;
  }

  static get updatedAtColumn() {
    return undefined;
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

  chat() {
    return this.belongsTo('App/Models/Chat')
  }

  messages() {
    return this.hasMany('App/Models/Message')
  }
}

module.exports = ChatUser
