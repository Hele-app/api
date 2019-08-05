'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RegionsSchema extends Schema {
  up () {
    this.create('regions', (table) => {
      table.string('name').notNullable()
    })
  }

  down () {
    this.drop('regions')
  }
}

module.exports = RegionsSchema
