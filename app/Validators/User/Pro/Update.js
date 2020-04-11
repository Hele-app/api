'use strict'

// eslint-disable-next-line
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

class Update {
  get rules() {
    return {
      phone: 'regex:^0[6-7](\\d{2}){4}$|unique:users,phone',
      username: 'regex:^[a-z]+[a-z0-9]+$',
      birthyear: 'integer|above:1800',
      email: 'email',
      role: 'in:MODERATOR,PROFESSIONAL,ADMIN',
      phone_pro: 'regex:^0[6-7](\\d{2}){4}$',
      active: 'boolean'
    }
  }

  get messages() {
    return {
      'phone.regex': 'E_PHONE_WRONG_FORMAT',
      'phone.unique': 'E_PHONE_NOT_UNIQUE',
      'username.regex': 'E_USERNAME_WRONG_FORMAT',
      'birthyear.integer': 'E_BIRTHYEAR_WRONG_FORMAT',
      'birthyear.above': 'E_BIRTHYEAR_WRONG_FORMAT',
      'email.email': 'E_EMAIL_WRONG_FORMAT',
      'role.in': 'E_ROLE_WRONG_FORMAT',
      'phone_pro.regex': 'E_PHONE_PRO_WRONG_FORMAT'
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    throw new ValidationException(errorMessages, 400)
  }
}

module.exports = Update