
exports.up = function (knex) {
  return knex.schema
    .createTable('user_settings', function (table) {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('pro_max_young').notNullable().defaultTo(5)
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('user_settings')
}
