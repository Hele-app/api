'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
// eslint-disable-next-line
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments()
      table.string('phone', 255).notNullable()
      table.string('username', 100).notNullable().unique().index()
      table.string('password', 255).notNullable()
      table.string('email').index()
      table.integer('birthyear').notNullable()
      table.integer('establishment_id')
        .unsigned().references('id').inTable('establishments')
      table.enu('role', ['YOUNG', 'MODERATOR', 'PROFESSIONAL', 'ADMIN'])
        .defaultTo('YOUNG').index()
      table.string('profession', 100)
      table.string('city', 100)
      table.string('phone_pro', 20)
      table.bool('active').defaultTo(true).index()
      table.datetime('last_login').defaultTo(this.fn.now())
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
