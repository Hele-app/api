
exports.up = function (knex) {
  return knex.schema
    .createTable('chats_users', function (table) {
      table.increments()
      table.integer('chat_id').unsigned().references('id').inTable('chats')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.bool('active').defaultTo(true).index()
      table.timestamps()
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('chats_users')
}
