'use strict'

// eslint-disable-next-line
const Database = use('Database')

// eslint-disable-next-line
const { test, trait, before, after } = use('Test/Suite')('Establishment')

trait('Test/ApiClient')

const establishment = {
  name: 'LLB',
  region_id: 1
}

before(async () => {
  await Database.beginGlobalTransaction()
})

after(async () => {
  await Database.rollbackGlobalTransaction()
})

test('Should fail without name', async ({ client }) => {
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

test('Should fail without region_id', async ({ client }) => {
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

test('Should fail with wrong region_id format', async ({ client }) => {
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

test('Should fail with wrong region_id', async ({ client }) => {
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

test('Should succeed with correct data', async ({ assert, client }) => {
  const response = await client.post('establishment').send(establishment).end()

  response.assertStatus(201)
})
