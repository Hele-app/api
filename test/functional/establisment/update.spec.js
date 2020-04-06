'use strict'

// eslint-disable-next-line
const Database = use('Database')

// eslint-disable-next-line
const Factory = use('Factory')

// eslint-disable-next-line
const Region = use('App/Models/Region')

// eslint-disable-next-line
const Establishment = use('App/Models/Establishment')

// eslint-disable-next-line
const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Establishment')

trait('Test/ApiClient')

let establishment = null

beforeEach(async () => {
  await Database.beginGlobalTransaction()

  const r = await Region.first()
  establishment = await Factory.model('App/Models/Establishment').create({
    region_id: r.id
  })
})

afterEach(async () => {
  await Database.rollbackGlobalTransaction()
})

test('Should fail with unknown id', async ({ client }) => {
  const data = {}
  const eId = 999

  const response = await client.put(`establishment/${eId}`).send(data).end()

  response.assertStatus(404)
})

test('Should fail with unknown region', async ({ client }) => {
  const data = { region_id: 999 }
  const eId = establishment.id

  const response = await client.put(`establishment/${eId}`).send(data).end()

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

test('Should succeed without new data', async ({ client }) => {
  const data = {}
  const eId = establishment.id

  const response = await client.put(`establishment/${eId}`).send(data).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: establishment.name,
    code: establishment.code,
    region_id: establishment.region_id
  })
})

test('Should succeed with same name in data', async ({ client }) => {
  const data = { name: establishment.name }
  const eId = establishment.id

  const response = await client.put(`establishment/${eId}`).send(data).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: establishment.name,
    code: establishment.code,
    region_id: establishment.region_id
  })
})

test('Should succeed with new name', async ({ client }) => {
  const data = { name: 'NYC' }
  const eId = establishment.id

  const response = await client.put(`establishment/${eId}`).send(data).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: data.name,
    code: establishment.code,
    region_id: establishment.region_id
  })
})

test('Should succeed with new region', async ({ client }) => {
  const diffRegion = await Region.query().where('id', '!=',
    establishment.region_id).first()

  const data = { region_id: diffRegion.id }
  const eId = establishment.id

  const response = await client.put(`establishment/${eId}`).send(data).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: establishment.name,
    code: establishment.code,
    region_id: data.region_id
  })
})
