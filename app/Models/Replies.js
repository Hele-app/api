'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Replies = use('Replies')

class Replies extends Model {
	user () {
        return this.belongsTo('App/Models/User')
    }
    post () {
        return this.belongsTo('App/Models/Post')
    }
}

module.exports = Replies
