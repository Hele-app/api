'use strict'

// eslint-disable-next-line
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

// eslint-disable-next-line
const LoginFormatter = use('App/Validators/Formatter/Login')

class Login {
  get sanitizationRules () {
    return {
      email: 'normalize_email'
    }
  }

  get formatter() {
    return LoginFormatter
  }

  get rules() {
    return {
      phone: 'required_without_all:username,email|exists:users,phone',
      username: 'required_without_all:phone,email|exists:users,username',
      email: 'required_without_all:phone,username|exists:users,email',
      password: 'required'
    }
  }

  get messages() {
    return {
      required_without_all: 'E_USER_IDENTIFIER_REQUIRED',
      'password.required': 'E_PASSWORD_REQUIRED',
      'phone.exists': 'E_USER_IDENTIFIER_OR_PASSWORD_INCORRECT', // TODO: should not be thrown, but handled in Controller to preserve database integrity
      'username.exists': 'E_USER_IDENTIFIER_OR_PASSWORD_INCORRECT', // TODO: should not be thrown, but handled in Controller to preserve database integrity
      'email.exists': 'E_USER_IDENTIFIER_OR_PASSWORD_INCORRECT' // TODO: should not be thrown, but handled in Controller to preserve database integrity
    }
  }

  get validateAll() {
    return true
  }

  async fails(errorMessages) {
    throw new ValidationException(errorMessages, 400)
  }
}

module.exports = Login
