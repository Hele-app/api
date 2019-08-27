'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdviceCardSchema extends Schema {
  up () {
    this.create('advice_cards', (table) => {
      table.increments()
      table.text('content').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('advice_cards')
  }
}

module.exports = AdviceCardSchema
