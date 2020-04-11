'use strict'

// eslint-disable-next-line
const Database = use('Database')

// eslint-disable-next-line
const Factory = use('Factory')

// eslint-disable-next-line
const Region = use('App/Models/Region')

// eslint-disable-next-line
const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Pro/update')

trait('Test/ApiClient')
trait('Auth/Client')

const young = {
  phone: '0600000001',
  username: 'james007',
  birthyear: 1985
}

let admin = null
let existingYoung = null
let establishment = null

const storeRoute = '/user/young/'
let youngId = null

beforeEach(async () => {
  await Database.beginGlobalTransaction()

  const r = await Region.first()
  establishment = await Factory.model('App/Models/Establishment').create({
    code: young.establishment_code,
    region_id: r.id
  })

  admin = await Factory.model('App/Models/User').create({
    role: 'ADMIN'
  })

  existingYoung = await Factory.model('App/Models/User').create()
  await existingYoung.establishment().associate(establishment)

  const tmpYoung = await Factory.model('App/Models/User').create(young)
  await tmpYoung.establishment().associate(establishment)
  youngId = tmpYoung.id
})

afterEach(async () => {
  await Database.rollbackGlobalTransaction()
})

test('Should fail if update not from connected user', async ({ client }) => {
  const response = await client.patch(storeRoute + youngId).send({}).end()

  response.assertStatus(401)
  response.assertError({
    status: 401,
    errors: 'E_INVALID_JWT_TOKEN: jwt must be provided'
  })
})

test('Should fail if update not from admin', async ({ client }) => {
  const response = await client
    .patch(storeRoute + youngId)
    .send({})
    .loginVia(existingYoung, 'jwt')
    .end()

  // response.assertStatus(401)
  response.assertError({
    status: 401,
    errors: [{ message: 'E_ADMIN_ONLY' }]
  })
})

test('Should fail with wrong phone format', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  testYoung.phone = '0200000000'

  const response = await client
    .patch(storeRoute + youngId)
    .send(testYoung)
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
  const testYoung = Object.assign({}, young)
  testYoung.phone = existingYoung.phone

  const response = await client
    .patch(storeRoute + youngId)
    .send(testYoung)
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
  const testYoung = Object.assign({}, young)
  testYoung.username = '007James'

  const response = await client
    .patch(storeRoute + youngId)
    .send(testYoung)
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
  const testYoung = Object.assign({}, young)
  testYoung.username = existingYoung.username

  const response = await client
    .patch(storeRoute + youngId)
    .send(testYoung)
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

test('Should fail with role not in role list', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  testYoung.role = 'SUPERADMIN'

  const response = await client
    .patch(storeRoute + youngId)
    .send(testYoung)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_ROLE_NOT_FOUND',
      field: 'role',
      validation: 'in'
    }]
  })
})

test('Should fail with wrong active format', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  testYoung.active = 'True'

  const response = await client
    .patch(storeRoute + youngId)
    .send(testYoung)
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
    .patch(storeRoute + youngId)
    .send(young)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(200)
})

test('Should succeed with new correct data', async ({ assert, client }) => {
  const response = await client
    .patch(storeRoute + youngId)
    .send({
      phone: '0698765432',
      username: 'baba',
      establishment_code: establishment.code
    })
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(200)
})
