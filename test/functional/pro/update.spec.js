'use strict'

// eslint-disable-next-line
const Database = use('Database')

// eslint-disable-next-line
const Factory = use('Factory')

// eslint-disable-next-line
const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Pro/update')

trait('Test/ApiClient')
trait('Auth/Client')

const pro = {
  phone: '0600000001',
  username: 'james007',
  birthyear: 1985,
  email: 'james@hele.fr',
  role: 'PROFESSIONAL',
  phone_pro: '0600000002',
  active: true
}

let existingPro = null
let admin = null

const storeRoute = '/user/pro/'
let proId = null

beforeEach(async () => {
  await Database.beginGlobalTransaction()

  admin = await Factory.model('App/Models/User').create({
    role: 'ADMIN'
  })

  existingPro = await Factory.model('App/Models/User').create({
    phone: '0600000000',
    username: 'bob001',
    email: 'bob@hele.fr',
    role: 'PROFESSIONAL'
  })

  const tmpPro = await Factory.model('App/Models/User').create(pro)
  proId = tmpPro.id
})

afterEach(async () => {
  await Database.rollbackGlobalTransaction()
})

test('Should fail if update not from connected user', async ({ client }) => {
  const response = await client.patch(storeRoute + proId).send({}).end()

  response.assertStatus(401)
  response.assertError({
    status: 401,
    errors: 'E_INVALID_JWT_TOKEN: jwt must be provided'
  })
})

test('Should fail if update not from admin', async ({ client }) => {
  const response = await client
    .patch(storeRoute + proId)
    .send({})
    .loginVia(existingPro, 'jwt')
    .end()

  // response.assertStatus(401)
  response.assertError({
    status: 401,
    errors: [{ message: 'E_ADMIN_ONLY' }]
  })
})

test('Should fail with wrong phone format', async ({ client }) => {
  const testPro = Object.assign({}, pro)
  testPro.phone = '0200000000'

  const response = await client
    .patch(storeRoute + proId)
    .send(testPro)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_PHONE_WRONG_FORMAT',
      field: 'phone',
      validation: 'regex'
    }]
  })
})

test('Should fail with existing phone number', async ({ client }) => {
  const testPro = Object.assign({}, pro)
  testPro.phone = existingPro.phone

  const response = await client
    .patch(storeRoute + proId)
    .send(testPro)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_PHONE_NOT_UNIQUE',
      field: 'phone',
      validation: 'unique'
    }]
  })
})

test('Should fail with wrong username format', async ({ client }) => {
  const testPro = Object.assign({}, pro)
  testPro.username = '007James'

  const response = await client
    .patch(storeRoute + proId)
    .send(testPro)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_USERNAME_WRONG_FORMAT',
      field: 'username',
      validation: 'regex'
    }]
  })
})

test('Should fail with username not unique', async ({ client }) => {
  const testPro = Object.assign({}, pro)
  testPro.username = existingPro.username

  const response = await client
    .patch(storeRoute + proId)
    .send(testPro)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_USERNAME_NOT_UNIQUE',
      field: 'username',
      validation: 'unique'
    }]
  })
})

test('Should fail with birthyear under 1800', async ({ client }) => {
  const testPro = Object.assign({}, pro)
  testPro.birthyear = 1799

  const response = await client
    .patch(storeRoute + proId)
    .send(testPro)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_BIRTHYEAR_WRONG_FORMAT',
      field: 'birthyear',
      validation: 'above'
    }]
  })
})

test('Should fail with wrong email', async ({ client }) => {
  const testPro = Object.assign({}, pro)
  testPro.email = 'toto.com'

  const response = await client
    .patch(storeRoute + proId)
    .send(testPro)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_EMAIL_WRONG_FORMAT',
      field: 'email',
      validation: 'email'
    }]
  })
})

test('Should fail with email not unique', async ({ client }) => {
  const testPro = Object.assign({}, pro)
  testPro.email = existingPro.email

  const response = await client
    .patch(storeRoute + proId)
    .send(testPro)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_EMAIL_NOT_UNIQUE',
      field: 'email',
      validation: 'unique'
    }]
  })
})

test('Should fail with role not in pro role list', async ({ client }) => {
  const testPro = Object.assign({}, pro)
  testPro.role = 'YOUNG'

  const response = await client
    .patch(storeRoute + proId)
    .send(testPro)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_ROLE_NOT_PRO',
      field: 'role',
      validation: 'in'
    }]
  })
})

test('Should fail with wrong phone pro format', async ({ client }) => {
  const testPro = Object.assign({}, pro)
  testPro.phone_pro = '060987654'

  const response = await client
    .patch(storeRoute + proId)
    .send(testPro)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_PHONE_PRO_WRONG_FORMAT',
      field: 'phone_pro',
      validation: 'regex'
    }]
  })
})

test('Should fail with wrong active format', async ({ client }) => {
  const testPro = Object.assign({}, pro)
  testPro.active = 'True'

  const response = await client
    .patch(storeRoute + proId)
    .send(testPro)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_ACTIVE_WRONG_FORMAT',
      field: 'active',
      validation: 'boolean'
    }]
  })
})

test('Should succeed with same data', async ({ assert, client }) => {
  const response = await client
    .patch(storeRoute + proId)
    .send(pro)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(200)
})
