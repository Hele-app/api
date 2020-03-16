'use strict'

// eslint-disable-next-line
const Database = use('Database')

// eslint-disable-next-line
const { test, trait, before, after } = use('Test/Suite')('PasswordReset')

// eslint-disable-next-line
const User = use('App/Models/User')

trait('Test/ApiClient')

const user = {
  phone: '0600000001',
  username: 'james007',
  email: 'james007@hele.fr',
  establishment_id: 1,
  birthyear: 2007,
  password: 'foobar'
}

before(async () => {
  await Database.beginGlobalTransaction()

  await User.create(user)
})

after(async () => {
  Database.rollbackGlobalTransaction()
})

test('should fail because the number is required', async ({ client }) => {
  const response = await client.post('auth/password/request').send({ }).end()
  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_PHONE_REQUIRED',
      field: 'phone',
      validation: 'required'
    }]
  })
})

test('should fail because the number is incorrect', async ({ client }) => {
  const response = await client.post('auth/password/request').send({ phone: '0600000002' }).end()
  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_USER_IDENTIFIER_OR_PASSWORD_INCORRECT',
      field: 'phone',
      validation: 'exists'
    }]
  })
})

test('should generate a password reset code', async ({ client }) => {
  const testPhone = user.phone

  const response = await client.post('auth/password/request').send({ phone: testPhone }).end()
  response.assertStatus(200)
})

test('should fail because the reset has already been requested', async ({ client }) => {
  const testPhone = user.phone

  const response = await client.post('auth/password/request').send({ phone: testPhone }).end()
  response.assertStatus(403)
  response.assertError({
    status: 403,
    errors: [
      { message: 'E_RESET_ALREADY_ASKED' }
    ]
  })
})
