'use strict'

const crypto = require('crypto')

// eslint-disable-next-line
const Database = use('Database')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
// eslint-disable-next-line
const Model = use('Model')

class Phone extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the phone number so no one can see which
     * phone numbers already exists.
     */
    this.addHook('beforeSave', async (phoneInstance) => {
      if (phoneInstance.dirty.number) {
        console.log(phoneInstance.number)
        phoneInstance.number = crypto
          .createHash('sha256')
          .update(phoneInstance.number)
          .digest('hex')
      }
    })
  }

  static async alreadyExists(phone) {
    phone = await Database.select('id').from('phones')
      .whereRaw('number = SHA2(?, "sha256")', phone)
    return phone.length > 0
  }
}

module.exports = Phone
