'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PoiSchema extends Schema {
  up () {
    this.create('pois', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('description')
      table.string('adress').notNullable()
      table.integer('code_postal').notNullable()
      table.string('horaire')
      table.string('phone').notNullable()
      table.string('site')
      table.string('latitude').notNullable()
      table.string('longitude').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('pois')
  }
}

module.exports = PoiSchema
