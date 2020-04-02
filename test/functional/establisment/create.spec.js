'use strict'

// eslint-disable-next-line
const Database = use('Database')

// eslint-disable-next-line
const { test, trait, before, after } = use('Test/Suite')('Establishment')

trait('Test/ApiClient')

const establishment = {
  name: 'LLB',
  code: 'AABBC',
  region_id: 1
}

before(async () => {
  await Database.beginGlobalTransaction()
})

after(async () => {
  Database.rollbackGlobalTransaction()
})

test('Failing without name', async ({ client }) => {
  const testEstab = Object.assign({}, establishment)
  delete testEstab.name

  const response = await client.post('establishment').send(testEstab).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_NAME_REQUIRED',
      field: 'name',
      validation: 'required'
    }]
  })
})

test('Failing with existing name', async ({ client }) => {
  const testEstab = Object.assign({}, establishment)
  testEstab.name = 'Louis Le Grand'

  const response = await client.post('establishment').send(testEstab).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_NAME_NOT_UNIQUE',
      field: 'name',
      validation: 'unique'
    }]
  })
})

test('Failing without code', async ({ client }) => {
  const testEstab = Object.assign({}, establishment)
  delete testEstab.code

  const response = await client.post('establishment').send(testEstab).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_CODE_REQUIRED',
      field: 'code',
      validation: 'required'
    }]
  })
})

test('Failing with wrong code format', async ({ client }) => {
  const testEstab = Object.assign({}, establishment)
  testEstab.code = 'AABB5'

  const response = await client.post('establishment').send(testEstab).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_CODE_WRONG_FORMAT',
      field: 'code',
      validation: 'regex'
    }]
  })
})

test('Failing without region_id', async ({ client }) => {
  const testEstab = Object.assign({}, establishment)
  delete testEstab.region_id

  const response = await client.post('establishment').send(testEstab).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_REGION_ID_REQUIRED',
      field: 'region_id',
      validation: 'required'
    }]
  })
})

test('Failing with wrong region_id format', async ({ client }) => {
  const testEstab = Object.assign({}, establishment)
  testEstab.region_id = 'A'

  const response = await client.post('establishment').send(testEstab).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_REGION_ID_WRONG_FORMAT',
      field: 'region_id',
      validation: 'integer'
    },
    {
      message: 'E_REGION_NOT_FOUND',
      field: 'region_id',
      validation: 'exists'
    }]
  })
})

test('Failing with wrong region_id', async ({ client }) => {
  const testEstab = Object.assign({}, establishment)
  testEstab.region_id = 999

  const response = await client.post('establishment').send(testEstab).end()

  response.assertStatus(400)
  response.assertError({
    status: 400,
    errors: [{
      message: 'E_REGION_NOT_FOUND',
      field: 'region_id',
      validation: 'exists'
    }]
  })
})

test('Succeed with correct data', async ({ assert, client }) => {
  const response = await client.post('establishment').send(establishment).end()

  response.assertStatus(201)
})
