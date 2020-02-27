'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
// eslint-disable-next-line
const Schema = use('Schema')

class PhoneSchema extends Schema {
  up () {
    this.create('phones', (table) => {
      table.increments()
      table.string('number').notNullable().index()
      table.timestamps()
    })
  }

  down () {
    this.drop('phones')
  }
}

module.exports = PhoneSchema
