'use strict'

// eslint-disable-next-line
const Database = use('Database')

// eslint-disable-next-line
const { test, trait, before, after } = use('Test/Suite')('Registration')

trait('Test/ApiClient')

const young = {
  phone: '0600000001',
  username: 'james007',
  age: 14,
  establishment_code: 'AAAAA'
}

before(async () => {
  await Database.beginGlobalTransaction()
})

after(async () => {
  Database.rollbackGlobalTransaction()
})

test('Failing without phone number', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  delete testYoung.phone

  const response = await client.post('auth/register').send(testYoung).end()

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

test('Failing with wrong phone format', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  testYoung.phone = '0200000000'

  const response = await client.post('auth/register').send(testYoung).end()

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

test('Failing with existing phone number', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  testYoung.phone = '0600000000'

  const response = await client.post('auth/register').send(testYoung).end()

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

test('Failing without username', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  delete testYoung.username

  const response = await client.post('auth/register').send(testYoung).end()

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

test('Failing with wrong username format', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  testYoung.username = '007James'

  const response = await client.post('auth/register').send(testYoung).end()

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

test('Failing without age', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  delete testYoung.age

  const response = await client.post('auth/register').send(testYoung).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_AGE_REQUIRED',
      field: 'age',
      validation: 'required'
    }]
  })
})

test('Failing with age under 11yrs old', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  testYoung.age = 10

  const response = await client.post('auth/register').send(testYoung).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_AGE_VALIDATION',
      field: 'age',
      validation: 'range'
    }]
  })
})

test('Failing with age above 17yrs old', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  testYoung.age = 18

  const response = await client.post('auth/register').send(testYoung).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_AGE_VALIDATION',
      field: 'age',
      validation: 'range'
    }]
  })
})

test('Failing without establishment code', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  delete testYoung.establishment_code

  const response = await client.post('auth/register').send(testYoung).end()

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

test('Failing with wrong establishment code', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  testYoung.establishment_code = 'AAAAB'

  const response = await client.post('auth/register').send(testYoung).end()

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

test('Succeed with correct data', async ({ assert, client }) => {
  const response = await client.post('auth/register').send(young).end()

  response.assertStatus(201)
})
