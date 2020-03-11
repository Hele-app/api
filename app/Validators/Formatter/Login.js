'use strict'

class LoginFormatter {
  constructor() {
    this.errors = []
  }

  addError(error, field, validation, args) {
    this.errors.push({ message: error })
  }

  // return null if no errors are present,
  // otherwise validate will be rejected with an empty
  // error
  toJSON() {
    return this.errors.length ? this.errors : null
  }
}

module.exports = LoginFormatter
