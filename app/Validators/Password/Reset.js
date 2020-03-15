'use strict'

class PasswordRequest {
  get rules () {
    return {
      phone: 'required|exists:users,phone'
    }
  }

  get messages() {
    return {
      'phone.required': 'E_PHONE_REQUIRED',
      'phone.exists': 'E_USER_IDENTIFIER_OR_PASSWORD_INCORRECT'
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
