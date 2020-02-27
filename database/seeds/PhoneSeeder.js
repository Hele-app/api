'use strict'

/*
|--------------------------------------------------------------------------
| PhoneSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const crypto = require('crypto')

// eslint-disable-next-line
const Phone = use('App/Models/Phone')

class PhoneSeeder {
  async run() {
    const data = [
      {
        id: 1,
        number: crypto.createHash('sha256').update('0600000000').digest('hex')
      }
    ]

    await Phone.createMany(data)
  }
}

module.exports = PhoneSeeder
