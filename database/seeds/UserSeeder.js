'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

// eslint-disable-next-line
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    const data = [
      {
        id: 1,
        phone: "0600000000",
        username: "john",
        password: "doe",
        establishment_id: 1,
        birthYear: 2007
      }
    ]

    await User.createMany(data)
  }
}

module.exports = UserSeeder
