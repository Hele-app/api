'use strict'

// eslint-disable-next-line
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

class PasswordRequest {
  get rules () {
    return {
      phone: 'required',
      code: 'required|exists:password_resets,code'
    }
  }

  get messages() {
    return {
      'phone.required': 'E_PHONE_REQUIRED',
      'code.required': 'E_RESET_CODE_REQUIRED',
      'code.exists': 'E_RESET_CODE_NOT_FOUND'
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
