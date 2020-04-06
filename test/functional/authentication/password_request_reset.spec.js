'use strict'

// eslint-disable-next-line
const Database = use('Database')

// eslint-disable-next-line
const Factory = use('Factory')

// eslint-disable-next-line
const { test, trait, beforeEach, afterEach } = use('Test/Suite')('PasswordReset')

// eslint-disable-next-line
const User = use('App/Models/User')

// eslint-disable-next-line
const PasswordReset = use('App/Models/PasswordReset')

// eslint-disable-next-line
const Region = use('App/Models/Region')

trait('Test/ApiClient')

const user = {
  phone: '0600000001'
}
const requestRoute = 'auth/password/request'
const resetRoute = 'auth/password/reset'

beforeEach(async () => {
  await Database.beginGlobalTransaction()

  const r = await Region.first()
  const e = await Factory.model('App/Models/Establishment').create({
    region_id: r.id
  })

  await Factory.model('App/Models/User').create({
    phone: user.phone,
    establishment_id: e.id
  })
})

afterEach(async () => {
  await Database.rollbackGlobalTransaction()
})

test('Should fail without phone', async ({ client }) => {
  const response = await client.post(requestRoute).send({}).end()
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

test('Should fail with not existing phone', async ({ client }) => {
  const response = await client.post(requestRoute).send({
    phone: '0600000002'
  }).end()

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

test('Should generate a password reset code', async ({ assert, client }) => {
  const response = await client.post(requestRoute).send({
    phone: user.phone
  }).end()

  response.assertStatus(200)
  assert.equal(response.body.code.length, 6)
})

test('Should fail with reset already requested', async ({ client }) => {
  let response = await client.post(requestRoute).send({
    phone: user.phone
  }).end()

  response = await client.post(requestRoute).send({
    phone: user.phone
  }).end()

  response.assertStatus(403)
  response.assertError({
    status: 403,
    errors: [{ message: 'E_RESET_CODE_ALREADY_REQUESTED' }]
  })
})

test('Should fail without phone', async ({ client }) => {
  let response = await client.post(requestRoute).send({
    phone: user.phone
  }).end()
  const code = response.body.code

  response = await client.post(resetRoute).send({ code: code }).end()

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

test('Should fail with not existing phone', async ({ client }) => {
  let response = await client.post(requestRoute).send({
    phone: user.phone
  }).end()
  const code = response.body.code

  response = await client.post(resetRoute).send({
    phone: '0600000002', code: code
  }).end()

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

test('Should fail without code', async ({ client }) => {
  const response = await client.post(resetRoute).send({
    phone: user.phone
  }).end()

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

test('Should fail with incorrect code', async ({ client }) => {
  const response = await client.post(resetRoute).send({
    phone: user.phone, code: 'NDJEWLS'
  }).end()

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

test('Should generate a new password for the user',
  async ({ assert, client }) => {
    let response = await client.post(requestRoute).send({
      phone: user.phone
    }).end()
    const code = response.body.code

    response = await client.post(resetRoute).send({
      phone: user.phone, code: code
    }).end()
    const afterUser = await User.findBy('phone', user.phone)

    response.assertStatus(200)
    assert.notEqual(user.password, afterUser.password)
  })

test('Should fail with already used code',
  async ({ client }) => {
    let response = await client.post(requestRoute).send({
      phone: user.phone
    }).end()
    const code = response.body.code

    response = await client.post(resetRoute).send({
      phone: user.phone, code: code
    }).end()

    response = await client.post(resetRoute).send({
      phone: user.phone, code: code
    }).end()

    response.assertStatus(403)
    response.assertError({
      status: 403,
      errors: [{ message: 'E_RESET_CODE_NOT_VALID' }]
    })
  })

test('Should fail because the code is too old', async ({ client }) => {
  const moment = require('moment')

  let response = await client.post(requestRoute).send({
    phone: user.phone
  }).end()
  const code = response.body.code

  const pr = await PasswordReset.query().where('code', code).first()
  pr.created_at = moment(pr.created_at).subtract(61, 'days').toDate()
  pr.is_used = false
  await pr.save()

  response = await client.post(resetRoute).send({
    phone: user.phone, code: code
  }).end()

  response.assertStatus(403)
  response.assertError({
    status: 403,
    errors: [{ message: 'E_RESET_CODE_NOT_VALID' }]
  })
})
