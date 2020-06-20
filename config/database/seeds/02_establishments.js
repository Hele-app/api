
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('establishments').del()
    .then(function () {
      // Inserts seed entries
      return knex('establishments').insert([
        {
          id: 1,
          name: 'Lycée Louis Le Grand',
          code: 'AAAAA',
          region_id: 10
        },
        {
          id: 2,
          name: 'Lycée Henri IV',
          code: 'AAAAB',
          region_id: 10
        }
      ])
    })
}
