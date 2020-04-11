'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// eslint-disable-next-line
const Factory = use('Factory')

// eslint-disable-next-line
const { generatePassword } = use('App/Helpers/Random')

Factory.blueprint('App/Models/User', async (faker, i, data) => {
  const user = {
    phone: data.phone || faker.phone({ country: 'fr', mobile: true })
      .replace(/\s/g, ''),
    username: data.username || faker.username(),
    password: data.password || generatePassword()
  }

  if (!data.role || data.role === 'YOUNG') {
    user.birthyear = data.birthyear || faker.year({ min: 2003, max: 2011 })
    user.establishment_id = data.establishment_id
  } else {
    user.email = data.email || faker.email({ domain: 'hele.fr' })
    user.birthyear = data.year || faker.year()
    user.role = data.role || 'PROFESSIONAL'
    user.profession = data.profession || faker.profession()
    user.city = data.city || faker.city()
    user.phone_pro = data.phone_pro || faker.phone({
      country: 'fr',
      mobile: false
    }).replace(/\s/g,'')
  }
  return user
})

Factory.blueprint('App/Models/Establishment', async (faker, i, data) => {
  return {
    name: data.name || faker.name(),
    code: data.code || faker.string({
      alpha: true, casing: 'upper', length: 5
    }),
    region_id: data.region_id
  }
})
