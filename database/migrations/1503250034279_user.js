'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('phone', 20).notNullable().unique()
      table.string('username', 100).notNullable().unique()
      table.string('password', 100).notNullable()
      table.string('email').index()
      table.integer('birthyear').notNullable()
      table.integer('region_id').notNullable()
      table.enu('roles', ['YOUNG', 'MODERATOR', 'PROFESSIONAL', 'ADMIN']).defaultTo('YOUNG').index()
      table.string('profession', 100)
      table.string('city', 100)
      table.string('phone_pro', 20)
      table.bool('active').defaultTo(true).index()
      table.datetime('last_login').defaultTo(this.fn.now())
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema

