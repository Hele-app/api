'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
// eslint-disable-next-line
const Model = use('Model')

class Establishment extends Model {
  /**
   * A relationship on region is required for
   * the creation of an establishment.
   *
   * @method region
   *
   * @return {Object}
   */
  region() {
    return this.belongsTo('App/Models/Region')
  }
}

module.exports = Establishment
