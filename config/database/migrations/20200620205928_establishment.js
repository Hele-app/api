'use strict'

exports.up = function(knex) {
  return knex.schema
    .createTable('establishments', function (table) {
      table.increments()
      table.string('name', 255).notNullable()
      table.string('code', 10).notNullable().unique()
      table.integer('region_id').notNullable()
        .unsigned().references('id').inTable('regions').onDelete('NO ACTION')
      table.timestamps()
    })
}

exports.down = function(knex) {
  return knex.schema.dropTable('establishments')
}
