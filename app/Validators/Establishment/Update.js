'use strict'

// eslint-disable-next-line
const { ValidationException } = use('@adonisjs/validator/src/Exceptions')

/* istanbul ignore next */
class Update {
  get rules() {
    const establishmentId = this.ctx.params.id
    return {
      name: `unique:establishments,name,id,${establishmentId}`,
      region_id: 'integer|exists:regions,id'
    }
  }

  get messages() {
    return {
      'name.unique': 'E_NAME_NOT_UNIQUE',
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

module.exports = Update
