'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PoiSchema extends Schema {
  up () {
    this.create('pois', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('description')
      table.string('address').notNullable()
      table.integer('zipcode').notNullable()
      table.string('city').notNullable()
      table.string('hour')
      table.string('phone').notNullable()
      table.string('site')
      table.float('lattitude').notNullable()
      table.float('longitude').notNullable()
      table.integer('region_id').notNullable()
      table.timestamps()
   
    })
  }

  down () {
    this.drop('pois')
  }
}

module.exports = PoiSchema

