'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
// eslint-disable-next-line
const Schema = use('Schema')

class EstablishmentSchema extends Schema {
  up() {
    this.create('establishments', (table) => {
      table.increments()
      table.string('name', 255).notNullable()
      table.string('code', 10).notNullable().unique()
      table.integer('region_id').notNullable()
        .unsigned().references('id').inTable('regions')
      table.timestamps()
    })
  }

  down() {
    this.drop('establishments')
  }
}

module.exports = EstablishmentSchema
