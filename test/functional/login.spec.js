'use strict'

// eslint-disable-next-line
const Database = use('Database')

// eslint-disable-next-line
const { test, trait, before, after } = use('Test/Suite')('Login')

// eslint-disable-next-line
const User = use('App/Models/User')

trait('Test/ApiClient')

const user = {
  id: 2,
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

test('Failing without phone, username and email', async ({ client }) => {
  const testUser = Object.assign({}, user)
  delete testUser.phone
  delete testUser.username
  delete testUser.email

  const response = await client.post('auth/login').send(testUser).end()
  console.log(response)
  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [
      {
        message: 'E_USER_IDENTIFICATION_REQUIRED',
        field: 'phone',
        validation: 'requiredWithoutAll'
      },
      {
        message: 'E_USER_IDENTIFICATION_REQUIRED',
        field: 'username',
        validation: 'requiredWithoutAll'
      },
      {
        message: 'E_USER_IDENTIFICATION_REQUIRED',
        field: 'email',
        validation: 'requiredWithoutAll'
      }
    ]
  })
})

test('Failing without password', async ({ client }) => {
  const testUser = Object.assign({}, user)
  delete testUser.password

  const response = await client.post('auth/login').send(testUser).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_PASSWORD_REQUIRED',
      field: 'password',
      validation: 'required'
    }]
  })
})

test('Failing with not existing phone', async ({ client }) => {
  const testUser = Object.assign({}, user)
  testUser.phone = '0600000002'
  delete testUser.username
  delete testUser.email

  const response = await client.post('auth/login').send(testUser).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_PHONE_NOT_FOUND',
      field: 'phone',
      validation: 'exists'
    }]
  })
})

test('Failing with not existing username', async ({ client }) => {
  const testUser = Object.assign({}, user)
  testUser.username = 'Bob'
  delete testUser.phone
  delete testUser.email

  const response = await client.post('auth/login').send(testUser).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_USERNAME_NOT_FOUND',
      field: 'username',
      validation: 'exists'
    }]
  })
})

test('Failing with not existing email', async ({ client }) => {
  const testUser = Object.assign({}, user)
  testUser.email = 'bob@hele.fr'
  delete testUser.phone
  delete testUser.username

  const response = await client.post('auth/login').send(testUser).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_EMAIL_NOT_FOUND',
      field: 'email',
      validation: 'exists'
    }]
  })
})

test('Succeed with existing phone and password', async ({ client }) => {
  const testUser = Object.assign({}, user)
  delete testUser.username
  delete testUser.email

  const response = await client.post('auth/login').send(testUser).end()

  response.assertStatus(200)
})

test('Succeed with existing username and password', async ({ client }) => {
  const testUser = Object.assign({}, user)
  delete testUser.phone
  delete testUser.email

  const response = await client.post('auth/login').send(testUser).end()

  response.assertStatus(200)
})

test('Succeed with existing email and password', async ({ client }) => {
  const testUser = Object.assign({}, user)
  delete testUser.username
  delete testUser.phone

  const response = await client.post('auth/login').send(testUser).end()

  response.assertStatus(200)
})
