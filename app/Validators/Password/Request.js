'use strict'

class PasswordRequest {
  get rules () {
    return {
      phone: 'required|exists:users,phone',
      code: 'required|exists:password_resets,code'
    }
  }

  get messages() {
    return {
      'phone.required': 'E_PHONE_REQUIRED',
      'phone.exists': 'E_USER_IDENTIFIER_OR_PASSWORD_INCORRECT',
      'code.required': 'E_CODE_REQUIRED',
      'code.exists': 'E_CODE_NOT_FOUND'
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
