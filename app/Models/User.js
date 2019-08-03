'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    /**
    * A hook to hash the user password before saving
    * it to the database.
    */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.phone) {
        // remove dots or spaces in phone number
        userInstance.phone = userInstance.phone.replace(/[.| ]/g, '')
      }
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }


  static get hidden () {
    return ['password']
  }

  static get dates () {
    return super.dates.concat(['last_login'])
  }

  chats() {
    return this
      .belongsToMany('App/Models/Chat')
      .pivotTable('chat_users')
  }

  messages() {
    return this.manyThrough('App/Models/ChatUser', 'messages')
  }
}

module.exports = User
