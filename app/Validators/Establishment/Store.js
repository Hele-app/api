'use strict'

// eslint-disable-next-line
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

class Store {
  get rules() {
    return {
      name: 'required|unique:establishments,name',
      code: 'required|regex:^[A-Z]{5}$',
      region_id: 'required|integer|exists:regions,id'
    }
  }

  get messages() {
    return {
      'name.required': 'E_NAME_REQUIRED',
      'name.unique': 'E_NAME_NOT_UNIQUE',
      'code.required': 'E_CODE_REQUIRED',
      'code.regex': 'E_CODE_WRONG_FORMAT',
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
