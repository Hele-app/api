'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VerifyPasswordSchema extends Schema {
  up () {
    this.create('verify_passwords', (table) => {
      table.increments()
      table.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('cascade')
      table.string('code').notNullable()
      table.bool('used').defaultTo(null)
      table.timestamps()
    })
  }


  down () {
    this.drop('verify_passwords')
  }
}

module.exports = VerifyPasswordSchema
