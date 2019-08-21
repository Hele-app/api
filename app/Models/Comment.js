'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Comment = use('Comment')

class Comment extends Model {
	user () {
        return this.belongsTo('App/Models/User')
    }
    post () {
        return this.belongsTo('App/Models/Post')
    }
}

module.exports = Comment
