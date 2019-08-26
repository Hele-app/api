'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SlotSchema extends Schema {
  up () {
    this.create('slots', (table) => {
      table.increments()
      table.integer('pro_id').notNullable()
      table.integer('young_id')
      table.timestamp('start_time').nullable()
      table.timestamp('end_time').nullable()
      table.timestamp('real_end').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('slots')
  }
}

module.exports = SlotSchema
