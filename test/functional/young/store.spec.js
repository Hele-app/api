'use strict'

// eslint-disable-next-line
const Database = use('Database')

// eslint-disable-next-line
const Factory = use('Factory')

// eslint-disable-next-line
const Region = use('App/Models/Region')

// eslint-disable-next-line
const { test, trait, before, after } = use('Test/Suite')('Young/store')

trait('Test/ApiClient')
trait('Auth/Client')

const young = {
  phone: '0600000001',
  username: 'james007',
  birthyear: 2012,
  establishment_code: 'AAAAA'
}

let existingYoung = null
let establishment = null
let admin = null

const storeRoute = '/user/young'

before(async () => {
  await Database.beginGlobalTransaction()

  admin = await Factory.model('App/Models/User').create({
    role: 'ADMIN'
  })

  const r = await Region.first()
  establishment = await Factory.model('App/Models/Establishment').create({
    code: young.establishment_code,
    region_id: r.id
  })

  existingYoung = await Factory.model('App/Models/User').create({
    role: 'YOUNG',
    establishment_id: establishment.id
  })
})

after(async () => {
  await Database.rollbackGlobalTransaction()
})

test('Should fail if creation not from connected user', async ({ client }) => {
  const response = await client.post(storeRoute).send({}).end()

  response.assertStatus(401)
  response.assertError({
    status: 401,
    errors: 'E_INVALID_JWT_TOKEN: jwt must be provided'
  })
})

test('Should fail if creation not from admin', async ({ client }) => {
  const response = await client
    .post(storeRoute)
    .send({})
    .loginVia(existingYoung, 'jwt')
    .end()

  // response.assertStatus(401)
  response.assertError({
    status: 401,
    errors: [{ message: 'E_ADMIN_ONLY' }]
  })
})

test('Should fail without phone number', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  delete testYoung.phone

  const response = await client
    .post(storeRoute)
    .send(testYoung)
    .loginVia(admin, 'jwt')
    .end()

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

test('Should fail with wrong phone format', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  testYoung.phone = '0200000000'

  const response = await client
    .post(storeRoute)
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
    .post(storeRoute)
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

test('Should fail without username', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  delete testYoung.username

  const response = await client
    .post(storeRoute)
    .send(testYoung)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_USERNAME_REQUIRED',
      field: 'username',
      validation: 'required'
    }]
  })
})

test('Should fail with wrong username format', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  testYoung.username = '007James'

  const response = await client
    .post(storeRoute)
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
    .post(storeRoute)
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

test('Should fail without birthyear', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  delete testYoung.birthyear

  const response = await client
    .post(storeRoute)
    .send(testYoung)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_BIRTHYEAR_REQUIRED',
      field: 'birthyear',
      validation: 'required'
    }]
  })
})

test('Should fail with wrong birthyear format', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  testYoung.birthyear = 'toto'

  const response = await client
    .post(storeRoute)
    .send(testYoung)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_BIRTHYEAR_WRONG_FORMAT',
      field: 'birthyear',
      validation: 'integer'
    }]
  })
})

test('Should fail without establishment code', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  delete testYoung.establishment_code

  const response = await client
    .post(storeRoute)
    .send(testYoung)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_ESTABLISHMENT_CODE_REQUIRED',
      field: 'establishment_code',
      validation: 'required'
    }]
  })
})

test('Should fail with unknown establishment code', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  testYoung.establishment_code = 'JAMES'

  const response = await client
    .post(storeRoute)
    .send(testYoung)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_ESTABLISHMENT_CODE_NOT_FOUND',
      field: 'establishment_code',
      validation: 'exists'
    }]
  })
})

test('Should succeed with correct data', async ({ client }) => {
  const response = await client
    .post(storeRoute)
    .send(young)
    .loginVia(admin, 'jwt')
    .end()

  response.assertStatus(201)
})
