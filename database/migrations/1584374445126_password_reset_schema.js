'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
// eslint-disable-next-line
const Schema = use('Schema')

class PasswordResetSchema extends Schema {
  up () {
    this.create('password_resets', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('code').notNullable().unique().index()
      table.boolean('is_used').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('password_resets')
  }
}

module.exports = PasswordResetSchema
