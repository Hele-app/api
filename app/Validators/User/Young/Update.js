'use strict'

// eslint-disable-next-line
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

class Store {
  get rules() {
    return {
      phone: 'required|regex:^0[6-7](\\d{2}){4}$',
      username: 'required|regex:^[a-z]+[a-z0-9]+$',
      age: 'required|integer',
      establishment_code: 'required|exists:establishments,code',
    }
  }

  get messages() {
    return {
      'phone.required': 'E_PHONE_REQUIRED',
      'phone.regex': 'E_PHONE_WRONG_FORMAT',
      'username.required': 'E_USERNAME_REQUIRED',
      'username.regex': 'E_USERNAME_WRONG_FORMAT',
      'age.required': 'E_AGE_REQUIRED',
      'age.integer': 'E_AGE_VALIDATION',
      'establishment_code.required': 'E_ESTABLISHMENT_CODE_REQUIRED',
      'establishment_code.exists': 'E_ESTABLISHMENT_CODE_NOT_FOUND'
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
