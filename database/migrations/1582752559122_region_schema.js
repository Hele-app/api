'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
// eslint-disable-next-line
const Schema = use('Schema')

class RegionSchema extends Schema {
  up() {
    this.create('regions', (table) => {
      table.increments()
      table.string('name', 255).notNullable()
      table.float('latitude', 14, 10).notNullable()
      table.float('longitude', 14, 10).notNullable()
      table.float('latitudeDelta', 14, 10).notNullable()
      table.float('longitudeDelta', 14, 10).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('regions')
  }
}

module.exports = RegionSchema
