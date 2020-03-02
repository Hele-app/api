'use strict'

// eslint-disable-next-line
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

class Login {
  get sanitizationRules () {
    return {
      email: 'normalize_email'
    }
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
      required_without_all: 'E_USER_IDENTIFICATION_REQUIRED',
      'password.required': 'E_PASSWORD_REQUIRED',
      'phone.exists': 'E_PHONE_NOT_FOUND',
      'username.exists': 'E_USERNAME_NOT_FOUND',
      'email.exists': 'E_EMAIL_NOT_FOUND'
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
