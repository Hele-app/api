'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Poi extends Model {
    region(){
        return this.hasOne('App/Models/Region')
    }
}

module.exports = Poi
