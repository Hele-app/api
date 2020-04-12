'use strict'

// eslint-disable-next-line
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

class Update {
  get rules() {
    const proId = this.ctx.params.id
    return {
      phone: `regex:^0[6-7](\\d{2}){4}$|unique:users,phone,id,${proId}`,
      username: `regex:^[a-z]+[a-z0-9]+$|unique:users,username,id,${proId}`,
      birthyear: 'integer|above:1800',
      email: `email|unique:users,email,id,${proId}`,
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
      'username.unique': 'E_USERNAME_NOT_UNIQUE',
      'birthyear.integer': 'E_BIRTHYEAR_WRONG_FORMAT',
      'birthyear.above': 'E_BIRTHYEAR_WRONG_FORMAT',
      'email.email': 'E_EMAIL_WRONG_FORMAT',
      'email.unique': 'E_EMAIL_NOT_UNIQUE',
      'role.in': 'E_ROLE_NOT_PRO',
      'phone_pro.regex': 'E_PHONE_PRO_WRONG_FORMAT',
      'active.boolean': 'E_ACTIVE_WRONG_FORMAT'
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
