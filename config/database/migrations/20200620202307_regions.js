'use strict'

exports.up = function (knex) {
  return knex.schema
    .createTable('regions', function (table) {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.float('latitude', 14, 10).notNullable()
      table.float('longitude', 14, 10).notNullable()
      table.float('latitude_delta', 14, 10).notNullable()
      table.float('longitude_delta', 14, 10).notNullable()
      table.timestamps()
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('regions')
}
