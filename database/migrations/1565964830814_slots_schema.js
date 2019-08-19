'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SlotSchema extends Schema {
  up () {
    this.create('slots', (table) => {
      table.increments()
      table.integer('pro_id').notNullable()
      table.integer('young_id')
      table.timestamp('start_time').defaultTo(this.fn.now())
      table.timestamp('end_time').defaultTo(this.fn.now())
      table.timestamp('real_end').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('slots')
  }
}

module.exports = SlotSchema
