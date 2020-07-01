
exports.up = function (knex) {
  return knex.schema
    .createTable('messages', function (table) {
      table.increments()
      table.integer('chat_id').unsigned().references('id').inTable('chats')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('body').notNullable()
      table.timestamps()
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('messages')
}
