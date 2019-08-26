'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Slot extends Model {
  static get dates () {
    return super.dates.concat(['start_time', 'end_time', 'real_end'])
  }
  user() {
    return this.belongsTo('App/Models/User', 'pro_id', 'id')
  }
}

module.exports = Slot
