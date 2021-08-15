'use strict'

exports.up = function(knex) {
  return knex.schema
    .createTable('articles', function (table) {
      table.increments()
      table.string('title', 255).notNullable()
      table.string('filepath').notNullable()
      table.timestamps()
    })
}

exports.down = function(knex) {
  return knex.schema.dropTable('articles')
}
