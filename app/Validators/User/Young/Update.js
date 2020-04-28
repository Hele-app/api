'use strict'

// eslint-disable-next-line
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

class Store {
  get rules() {
    const youngId = this.ctx.params.id

    return {
      phone: `regex:^0[6-7](\\d{2}){4}$|unique:users,phone,id,${youngId}`,
      username: `regex:^[a-z]+[a-z0-9]+$|unique:users,username,id,${youngId}`,
      birthyear: 'integer',
      establishment_code: 'exists:establishments,code',
      role: 'in:YOUNG,MODERATOR,PROFESSIONAL,ADMIN',
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
      'establishment_code.exists': 'E_ESTABLISHMENT_CODE_NOT_FOUND',
      'role.in': 'E_ROLE_NOT_FOUND',
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

module.exports = Store
