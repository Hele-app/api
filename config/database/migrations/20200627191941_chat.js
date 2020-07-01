
exports.up = function (knex) {
  return knex.schema
    .createTable('chats', function (table) {
      table.increments()
      table.enu('type', ['PRIVATE', 'GROUP'])
      table.timestamps()
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('chats')
}
