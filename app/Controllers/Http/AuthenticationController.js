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
    const establishment = await Establishment.findBy('code', code)
    if (establishment === null) {
      throw new ValidationException([{
        message: "E_ESTABLISHMENT_CODE_NOT_EXISTS",
        field: 'establishment_code',
        validation: 'exists'
      }], 404)
    }

    const user = new User()
    user.phone = phone
    user.username = request.input('username')
    user.establishment_id = establishment.id
    user.birthyear = new Date().getFullYear() - request.input('age')
    user.password = generatePassword()

    await user.save()

    return response.status(201).json({ user: user })
  }
}

module.exports = AuthenticationController
