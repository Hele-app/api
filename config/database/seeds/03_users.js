const argon = require('argon2')

exports.seed = function (knex) {
  return knex('users').del()
    .then(async function () {
      return knex('users').insert([
        {
          id: 1,
          phone: '0600000000',
          username: 'admin',
          birthyear: 1990,
          password: await argon.hash('admin'),
          email: 'admin@hele.fr',
          role: 'ADMIN'
        },
        {
          id: 2,
          phone: '0600000001',
          username: 'pro',
          birthyear: 1990,
          password: await argon.hash('pro'),
          email: 'pro@hele.fr',
          profession: 'Psy',
          city: 'Paris',
          phone_pro: '0610000000',
          role: 'PROFESSIONAL'
        },
        {
          id: 3,
          phone: '0600000002',
          username: 'mod',
          birthyear: 1990,
          password: await argon.hash('mod'),
          email: 'mod@hele.fr',
          profession: 'Moderateur',
          city: 'Paris',
          phone_pro: '0620000000',
          role: 'MODERATOR'
        },
        {
          id: 4,
          phone: '0600000003',
          username: 'young',
          birthyear: 2007,
          password: await argon.hash('young'),
          role: 'YOUNG',
          establishment_id: 1
        }
      ])
    })
}
