'use strict'

// eslint-disable-next-line
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

class Authentication {
  get rules() {
    return {
      phone: 'required|regex:^0[6-7](\\d{2}){4}$|unique:users,phone',
      username: 'required|regex:^[a-z]+[a-z0-9]+$',
      age: 'required|integer|range:11,17',
      establishment_code: 'required|regex:^[a-zA-Z0-9]{5}$'
    }
  }

  get messages() {
    return {
      'phone.required': 'Please provide your phone number',
      'phone.regex': 'Please provide a phone number starting with 06 or 07 ' +
        'followed by 8 digits',
      'phone.unique': 'Phone number already used',
      'username.required': 'Please provide a username',
      'username.regex': 'Please provide a username with lowercase letters ' +
        'and digits',
      'age.required': 'Please provide your age',
      'age.range': 'You must be older than 10yrs old and under 18yrs old',
      'establishment_code.required': 'Please provide your establishment code'
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    throw new ValidationException(errorMessages, 400)
  }
}

module.exports = Authentication
