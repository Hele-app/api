'use strict'

// eslint-disable-next-line
const { test, trait } = use('Test/Suite')('Basic')

trait('Test/ApiClient')

test('default api route', async ({ client }) => {
  const response = await client.get('/').end()

  response.assertStatus(200)
  response.assertJSON({ greeting: 'Hello from Hélé API' })
})
