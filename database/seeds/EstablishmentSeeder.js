'use strict'

/*
|--------------------------------------------------------------------------
| EstablishmentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

// eslint-disable-next-line
const Establishment = use('App/Models/Establishment')

class EstablishmentSeeder {
  async run () {
    const data = [
      {
        id: 1,
        name: "Louis Le Grand",
        code: "AAA",
        region_id: 1
      },
      {
        id: 2,
        name: "Polytechnique",
        code: "BBB",
        region_id: 2
      }
    ]
    let establishments = await Establishment.createMany(data)
  }
}

module.exports = EstablishmentSeeder
