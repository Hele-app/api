'use strict'

exports.up = function (knex) {
  return knex.schema
    .createTable('password_resets', function (table) {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('code').notNullable().unique().index()
      table.boolean('is_used').defaultTo(false)
      table.timestamps()
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('password_resets')
}
