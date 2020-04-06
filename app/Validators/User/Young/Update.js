'use strict'

// eslint-disable-next-line
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

class Store {
  get rules() {
    return {
      phone: 'regex:^0[6-7](\\d{2}){4}$',
      username: 'regex:^[a-z]+[a-z0-9]+$',
      birthyear: 'integer',
      establishment_code: 'exists:establishments,code',
      role: 'in:MODERATOR,PROFESSIONAL,ADMIN',
      active: 'boolean'
    }
  }

  get messages() {
    return {
      'phone.regex': 'E_PHONE_WRONG_FORMAT',
      'username.regex': 'E_USERNAME_WRONG_FORMAT',
      'age.integer': 'E_AGE_VALIDATION',
      'establishment_code.exists': 'E_ESTABLISHMENT_CODE_NOT_FOUND',
      'role.in': 'E_ROLE_WRONG_FORMAT'
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    throw new ValidationException(errorMessages, 400)
  }
}

module.exports = Store
