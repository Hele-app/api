'use strict'

// eslint-disable-next-line
const Establishment = use('App/Models/Establishment')

// eslint-disable-next-line
const User = use('App/Models/User')

// eslint-disable-next-line
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

// eslint-disable-next-line
const { generatePassword } = use('App/Helpers')

class AuthenticationController {
  async register({ request, response }) {
    const phone = request.input('phone')

    const code = request.input('establishment_code')
    const establishment = await Establishment.findByOrFail('code', code)

    const user = new User()
    user.phone = phone
    user.username = request.input('username')
    user.establishment_id = establishment.id
    user.birthyear = new Date().getFullYear() - request.input('age')
    user.password = generatePassword()

    await user.save()

    return response.status(201).json({ user })
  }

  async login({ request, auth, response }) {
    let field = null
    let value = null

    if (request.input('phone', false) !== false) {
      field = 'phone'
      value = request.input('phone')
    } else if (request.input('username', false) !== false) {
      field = 'username'
      value = request.input('username')
    } else if (request.input('email', false) !== false) {
      field = 'email'
      value = request.input('email')
    }

    const user = await User.findByOrFail(field, value)

    if (await auth.attempt(user.phone, request.input('password'))) {
      const accessToken = await auth.withRefreshToken().generate(user)

      return response.status(200).json({ user, accessToken })
    }
  }
}

module.exports = AuthenticationController
