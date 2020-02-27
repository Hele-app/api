'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
// eslint-disable-next-line
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
// eslint-disable-next-line
const Hash = use('Hash')

// eslint-disable-next-line
const Phone = use('App/Models/Phone')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password and the phone number
     * before saving it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
      if (userInstance.dirty.phone) {
        const phoneHash = new Phone()
        phoneHash.number = userInstance.phone
        await phoneHash.save()
        userInstance.phone = await Hash.make(userInstance.phone)
      }
    })
  }

  static get hidden () {
    return ['phone, password']
  }

  /**
   * A relationship on establishment is required for
   * a young registration to work.
   *
   * @method establishment
   *
   * @return {Object}
   */
  establishment() {
    return this.belongsTo('App/Models/Establishment')
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
