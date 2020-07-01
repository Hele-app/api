
exports.seed = function (knex) {
  return knex('chats').del()
    .then(function () {
      return knex('chats').insert([
        { id: 1, type: 'PRIVATE' }
      ]).then(function () {
        return knex('chats_users').del()
          .then(function () {
            return knex('chats_users').insert([
              { id: 1, user_id: 2, chat_id: 1 },
              { id: 2, user_id: 4, chat_id: 1 }
            ])
          })
      })
    })
}
