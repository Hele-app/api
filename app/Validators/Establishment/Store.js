'use strict'

// eslint-disable-next-line
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

class Store {
  get rules() {
    return {
      name: 'required',
      region_id: 'required|integer|exists:regions,id'
    }
  }

  get messages() {
    return {
      'name.required': 'E_NAME_REQUIRED',
      'region_id.required': 'E_REGION_ID_REQUIRED',
      'region_id.integer': 'E_REGION_ID_WRONG_FORMAT',
      'region_id.exists': 'E_REGION_NOT_FOUND'
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
