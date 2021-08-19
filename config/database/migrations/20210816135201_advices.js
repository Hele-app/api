'use strict'

exports.up = function(knex) {
  return knex.schema
    .createTable('advices', function (table) {
      table.increments()
      table.string('quote', 255).notNullable()
      table.timestamps()
    })
}

exports.down = function(knex) {
  return knex.schema.dropTable('advices')
}
