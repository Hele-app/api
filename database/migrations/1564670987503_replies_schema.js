'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepliesSchema extends Schema {
  up () {
    this.create('replies', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('post_id').unsigned().references('id').inTable('posts')
      table.text('content').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('replies')
  }
}

module.exports = RepliesSchema
