
exports.seed = function (knex) {
  return knex('user_settings').del()
    .then(function () {
      return knex('user_settings').insert([
        {
          id: 1,
          user_id: 2,
          pro_max_young: 2
        }
      ])
    })
}
