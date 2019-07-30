'use strict'

const { test, trait } = use('Test/Suite')('Authentication')

const User = use('App/Models/User')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('phone required', async ({ assert, client }) => {
  const response = await client.post('/v1/auth/register').send({
    username: "newChild",
    age: "12",
    region: "Ile-de-France"
  }).end()
  response.assertStatus(400)
  response.assertJSONSubset({
    message: [{
      validation: "required",
      field: "phone"
    }]
  })
})

test('phone not well formatted - too few numbers', async ({ assert, client}) => {
  const response = await client.post('/v1/auth/register').send({
    phone: "06312",
    username: "newChild",
    age: "12",
    region: "Ile-de-France"
  }).end()
  response.assertStatus(400)
  response.assertJSONSubset({
    message: [{
      validation: "regex",
      field: "phone"
    }]
  })
})


test('phone not well formatted - not starting with 0', async ({ assert, client}) => {
  const response = await client.post('/v1/auth/register').send({
    phone: "1726372837",
    username: "newChild",
    age: "12",
    region: "Ile-de-France"
  }).end()
  response.assertStatus(400)
  response.assertJSONSubset({
    message: [{
      validation: "regex",
      field: "phone"
    }]
  })
})

test('phone not well formatted - no 6 or 7 after 0', async ({ assert, client}) => {
  const response = await client.post('/v1/auth/register').send({
    phone: "02827362839",
    username: "newChild",
    age: "12",
    region: "Ile-de-France"
  }).end()
  response.assertStatus(400)
  response.assertJSONSubset({
    message: [{
      validation: "regex",
      field: "phone"
    }]
  })
})

test('phone unique', async ({ assert, client}) => {
  const user = new User()
  user.phone = "0637283728"
  user.username = "toto"
  user.password = "mdwekmklwemf"
  user.birthyear = 1998
  user.region = "Ile-de-France"
  await user.save()

  const response = await client.post('/v1/auth/register').send({
    phone: "0637283728",
    username: "newChild",
    age: "12",
    region: "Ile-de-France"
  }).end()
  response.assertStatus(400)
  response.assertJSONSubset({
    message: [{
      validation: "unique",
      field: "phone"
    }]
  })
})

test('username required', async ({ assert, client }) => {
  const response = await client.post('/v1/auth/register').send({
    phone: "0648372745",
    age: "12",
    region: "Ile-de-France"
  }).end()
  response.assertStatus(400)
  response.assertJSONSubset({
    message: [{
      validation: "required",
      field: "username"
    }]
  })
})

test('phone unique', async ({ assert, client}) => {
  const user = new User()
  user.phone = "0637283728"
  user.username = "toto"
  user.password = "mdwekmklwemf"
  user.birthyear = 1998
  user.region = "Ile-de-France"
  await user.save()

  const response = await client.post('/v1/auth/register').send({
    phone: "0637283721",
    username: "toto",
    age: "12",
    region: "Ile-de-France"
  }).end()
  response.assertStatus(400)
  response.assertJSONSubset({
    message: [{
      validation: "unique",
      field: "username"
    }]
  })
})

test('age required', async ({ assert, client }) => {
  const response = await client.post('/v1/auth/register').send({
    phone: "0648372745",
    username: "toto",
    region: "Ile-de-France"
  }).end()
  response.assertStatus(400)
  response.assertJSONSubset({
    message: [{
      validation: "required",
      field: "age"
    }]
  })
})

test('age above 10', async ({ assert, client}) => {
  const response = await client.post('/v1/auth/register').send({
    phone: "0637283721",
    username: "toto",
    age: "9",
    region: "Ile-de-France"
  }).end()
  response.assertStatus(400)
  response.assertJSONSubset({
    message: [{
      validation: "above",
      field: "age"
    }]
  })
})

test('region required', async ({ assert, client }) => {
  const response = await client.post('/v1/auth/register').send({
    phone: "0648372745",
    username: "toto",
    age: "12",
  }).end()
  response.assertStatus(400)
  response.assertJSONSubset({
    message: [{
      validation: "required",
      field: "region"
    }]
  })
})

test('register new child', async ({ assert, client }) => {
  const response = await client.post('/v1/auth/register').send({
    phone: "0648372745",
    username: "newChild",
    age: "12",
    region: "Ile-de-France"
  }).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    user: {
      username: "newChild",
      birthyear: 2007
    }
  })
})

test('phone or username or email required', async ({ assert, client }) => {
  const response = await client.post('/v1/auth/login').send({
    password: "toto"
  }).end()

  response.assertStatus(400)
  response.assertJSONSubset({
    message: [
    {
      field: 'phone',
      validation: 'requiredWithoutAll'
    },
    {
      field: 'username',
      validation: 'requiredWithoutAll'
    },
    {
      field: 'email',
      validation: 'requiredWithoutAll'
    }
  ]})
})

test('password required', async ({ assert, client }) => {
  const response = await client.post('/v1/auth/login').send({
    username: "toto"
  }).end()

  response.assertStatus(400)
  response.assertJSONSubset({
    message: [{
        field: 'password',
        validation: 'required'
    }]
  })
})

test('login user', async ({ assert, client}) => {
  const user = new User()
  user.phone = "0637283728"
  user.username = "toto"
  user.password = "mdwekmklwemf"
  user.birthyear = 1998
  user.region = "Ile-de-France"
  await user.save()

  const response = await client.post('/v1/auth/login').send({
    phone: "0637283728",
    password: "mdwekmklwemf"
  }).end()
  response.assertStatus(200)
  response.assertJSONSubset({
    access_token: {
      type: "bearer"
    }
  })
})
