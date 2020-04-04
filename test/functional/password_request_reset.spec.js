'use strict'

// eslint-disable-next-line
const Database = use('Database')

// eslint-disable-next-line
const { test, trait, before, after } = use('Test/Suite')('PasswordReset')

// eslint-disable-next-line
const User = use('App/Models/User')

// eslint-disable-next-line
const PasswordReset = use('App/Models/PasswordReset')

trait('Test/ApiClient')

const user = {
  phone: '0600000001',
  username: 'james007',
  email: 'james007@hele.fr',
  establishment_id: 1,
  birthyear: 2007,
  password: 'foobar'
}
let resetCode = null

before(async () => {
  await Database.beginGlobalTransaction()

  await User.create(user)
})

after(async () => {
  await Database.rollbackGlobalTransaction()
})

test('should fail because the phone is required', async ({ client }) => {
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

test('should not fail even if the phone is incorrect', async ({ client }) => {
  const response = await client.post('auth/password/request').send({ phone: '0600000002' }).end()
  response.assertStatus(200)
})

test('should generate a password reset code', async ({ assert, client }) => {
  const response = await client.post('auth/password/request').send({ phone: user.phone }).end()
  response.assertStatus(200)
  assert.equal(response.body.code.length, 6)
  resetCode = response.body.code
})

test('should fail because the reset has already been requested', async ({ client }) => {
  const testPhone = user.phone

  const response = await client.post('auth/password/request').send({ phone: testPhone }).end()
  response.assertStatus(403)
  response.assertError({
    status: 403,
    errors: [{ message: 'E_RESET_CODE_ALREADY_REQUESTED' }]
  })
})

test('Should fail because the phone is required', async ({ client }) => {
  const response = await client.post('auth/password/reset').send({ code: resetCode }).end()
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

test('Should not fail even if the phone is incorrect', async ({ client }) => {
  const response = await client.post('auth/password/reset').send({ phone: '0600000002', code: resetCode }).end()
  response.assertStatus(200)
})

test('Should fail because the code is required', async ({ client }) => {
  const response = await client.post('auth/password/reset').send({ phone: user.phone }).end()
  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_RESET_CODE_REQUIRED',
      field: 'code',
      validation: 'required'
    }]
  })
})

test('Should fail because the code is incorrect', async ({ client }) => {
  const response = await client.post('auth/password/reset').send({ phone: user.phone, code: 'hallah' }).end()
  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_RESET_CODE_NOT_FOUND',
      field: 'code',
      validation: 'exists'
    }]
  })
})

test('Should generate a new password for the user', async ({ assert, client }) => {
  const beforeUser = await User.findBy('phone', user.phone)
  const response = await client.post('auth/password/reset').send({ phone: user.phone, code: resetCode }).end()
  const afterUser = await User.findBy('phone', user.phone)

  response.assertStatus(200)
  assert.notEqual(beforeUser.password, afterUser.password)
})

test('Should fail because the code has been used already', async ({ client }) => {
  const response = await client.post('auth/password/reset').send({ phone: user.phone, code: resetCode }).end()
  response.assertStatus(403)
  response.assertError({
    status: 403,
    errors: [{ message: 'E_RESET_CODE_NOT_VALID' }]
  })
})

test('Should fail because the code is too old', async ({ client }) => {
  const moment = require('moment')
  const pr = await PasswordReset.query().where('code', resetCode).first()
  pr.created_at = moment(pr.created_at).subtract(61, 'days').toDate()
  pr.is_used = false
  await pr.save()

  const response = await client.post('auth/password/reset').send({ phone: user.phone, code: resetCode }).end()
  response.assertStatus(403)
  response.assertError({
    status: 403,
    errors: [{ message: 'E_RESET_CODE_NOT_VALID' }]
  })
})
