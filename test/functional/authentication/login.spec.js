'use strict'

// eslint-disable-next-line
const Database = use('Database')

// eslint-disable-next-line
const Factory = use('Factory')

// eslint-disable-next-line
const { test, trait, before, after } = use('Test/Suite')('Login')

// eslint-disable-next-line
const User = use('App/Models/User')

trait('Test/ApiClient')

const user = {
  phone: '0600000001',
  username: 'james007',
  email: 'james007@hele.fr',
  password: 'foobar'
}

const loginRoute = 'auth/login'
const meRoute = 'auth/me'

before(async () => {
  await Database.beginGlobalTransaction()

  await Factory.model('App/Models/User').create({
    phone: user.phone,
    username: user.username,
    email: user.email,
    role: 'PROFESSIONAL',
    password: user.password
  })
})

after(async () => {
  await Database.rollbackGlobalTransaction()
})

test('Should fail without phone, username and email', async ({ client }) => {
  const testUser = Object.assign({}, user)
  delete testUser.phone
  delete testUser.username
  delete testUser.email

  const response = await client.post(loginRoute).send(testUser).end()
  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [
      { message: 'E_USER_IDENTIFIER_REQUIRED' },
      { message: 'E_USER_IDENTIFIER_REQUIRED' },
      { message: 'E_USER_IDENTIFIER_REQUIRED' }
    ]
  })
})

test('Should fail without password', async ({ client }) => {
  const testUser = Object.assign({}, user)
  delete testUser.password

  const response = await client.post(loginRoute).send(testUser).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{ message: 'E_PASSWORD_REQUIRED' }]
  })
})

test('Should fail with not existing phone', async ({ client }) => {
  const testUser = Object.assign({}, user)
  testUser.phone = '0600000002'
  delete testUser.username
  delete testUser.email

  const response = await client.post(loginRoute).send(testUser).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{ message: 'E_USER_IDENTIFIER_OR_PASSWORD_INCORRECT' }]
  })
})

test('Should fail with not existing username', async ({ client }) => {
  const testUser = Object.assign({}, user)
  testUser.username = 'Bob'
  delete testUser.phone
  delete testUser.email

  const response = await client.post(loginRoute).send(testUser).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{ message: 'E_USER_IDENTIFIER_OR_PASSWORD_INCORRECT' }]
  })
})

test('Should fail with not existing email', async ({ client }) => {
  const testUser = Object.assign({}, user)
  testUser.email = 'bob@hele.fr'
  delete testUser.phone
  delete testUser.username

  const response = await client.post(loginRoute).send(testUser).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{ message: 'E_USER_IDENTIFIER_OR_PASSWORD_INCORRECT' }]
  })
})

test('Should fail with wrong password', async ({ client }) => {
  const testUser = Object.assign({}, user)
  testUser.password = 'bond007'
  delete testUser.username
  delete testUser.email

  const response = await client.post(loginRoute).send(testUser).end()

  // response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{ message: 'E_USER_IDENTIFIER_OR_PASSWORD_INCORRECT' }]
  })
})

test('Should fail with no accessToken', async ({ client }) => {
  const response = await client.get(meRoute).end()

  response.assertStatus(401)
})

test('Should fail with an invalid accessToken', async ({ client }) => {
  const token = 'Bearer fmwkejfn'
  const response = await client.get(meRoute).header('Authorization',
    token).end()

  response.assertStatus(401)
})

test('Should succeed with existing phone and password', async ({ client }) => {
  const testUser = Object.assign({}, user)
  delete testUser.username
  delete testUser.email

  const response = await client.post(loginRoute).send(testUser).end()

  response.assertStatus(200)
})

test('Should succeed with correct username and password', async ({ client }) => {
  const testUser = Object.assign({}, user)
  delete testUser.phone
  delete testUser.email

  const response = await client.post(loginRoute).send(testUser).end()

  response.assertStatus(200)
})

test('Should succeed with existing email and password', async ({ client }) => {
  const testUser = Object.assign({}, user)
  delete testUser.username
  delete testUser.phone

  const response = await client.post(loginRoute).send(testUser).end()

  response.assertStatus(200)
})

test('Should succeed with a valid accessToken', async ({ assert, client }) => {
  const testUser = Object.assign({}, user)
  delete testUser.username
  delete testUser.phone

  let response = await client.post(loginRoute).send(testUser).end()
  const token = response.body.accessToken.token

  response = await client.get(meRoute).header('Authorization', `Bearer ${token}`).end()

  response.assertStatus(200)
  assert.equal(user.phone, response.body.phone)
})
