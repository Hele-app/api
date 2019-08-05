'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Region extends Model {
    pois() {
        return this.hasMany('App/Models/Poi')
      }
}


module.exports = Region
