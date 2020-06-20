'use strict'

exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments()
      table.string('phone', 255).notNullable().index()
      table.string('username', 100).notNullable().unique().index()
      table.string('password', 255).notNullable()
      table.string('email').index().unique()
      table.integer('birthyear').notNullable()
      table.integer('establishment_id')
        .unsigned().references('id').inTable('establishments')
      table.enu('role', ['YOUNG', 'MODERATOR', 'PROFESSIONAL', 'ADMIN'])
        .defaultTo('YOUNG').index()
      table.string('profession', 100)
      table.string('city', 100)
      table.string('phone_pro', 20)
      table.bool('active').defaultTo(true).index()
      table.datetime('last_login').defaultTo(knex.fn.now())
      table.timestamps()
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
