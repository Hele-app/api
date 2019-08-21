'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Reply = use('Reply')

class Reply extends Model {
	user () {
        return this.belongsTo('App/Models/User')
    }
    post () {
        return this.belongsTo('App/Models/Post')
    }
}

module.exports = Reply
