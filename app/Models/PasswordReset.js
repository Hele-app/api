'use strict'

const moment = require('moment')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
// eslint-disable-next-line
const Model = use('Model')

class PasswordReset extends Model {

  /**
   * Returns true if token is generated in the previous 60 minutes.
   * False otherwise.
   *
   * @return {boolean}
   */
  isValid() {
    return this.generatedAgo() < 60
  }

  /**
   * @return {Integer}
   */
  generatedAgo(unit = 'minutes') {
    return moment(this.created_at).diff(moment(), unit)
  }

  /**
   * A relationship on user
   *
   * @method user
   *
   * @return {Object}
   */
  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = PasswordReset
