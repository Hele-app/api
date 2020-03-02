'use strict'

// eslint-disable-next-line
const { test, trait } = use('Test/Suite')('Registration')

// eslint-disable-next-line
const User = use('App/Models/User')

/** @type {import('@adonisjs/framework/src/Hash')} */
// eslint-disable-next-line
const Hash = use('Hash')

trait('Test/ApiClient')
trait('DatabaseTransactions')

const young = {
  phone: '0600000001',
  username: 'james007',
  age: 14,
  establishment_code: 'AAAAA'
}

test('Registration failing without phone number', async ({ client }) => {
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

test('Registration failing with wrong phone format', async ({ client }) => {
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

test('Registration failing with existing phone number', async ({ client }) => {
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

test('Registration failing without username', async ({ client }) => {
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

test('Registration failing with wrong username format', async ({ client }) => {
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

test('Registration failing without age', async ({ client }) => {
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

test('Registration failing with age under 11yrs old', async ({ client }) => {
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

test('Registration failing with age above 17yrs old', async ({ client }) => {
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

test('Registration failing without establishment code', async ({ client }) => {
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

test('Registration failing with wrong establishment code', async ({ client }) => {
  const testYoung = Object.assign({}, young)
  testYoung.establishment_code = 'AAAAB'

  const response = await client.post('auth/register').send(testYoung).end()

  response.assertStatus(404)
  response.assertError({
    status: 404,
    errors: [{
      message: 'E_ESTABLISHMENT_CODE_NOT_EXISTS',
      field: 'establishment_code',
      validation: 'exists'
    }]
  })
})

test('Registration successful with correct data', async ({ assert, client }) => {
  const response = await client.post('auth/register').send(young).end()

  response.assertStatus(201)
})
