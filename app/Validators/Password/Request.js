'use strict'

// eslint-disable-next-line
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

class PasswordRequest {
  get rules() {
    return {
      phone: 'required'
    }
  }

  get messages() {
    return {
      'phone.required': 'E_PHONE_REQUIRED'
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    throw new ValidationException(errorMessages, 400)
  }
}

module.exports = PasswordRequest
