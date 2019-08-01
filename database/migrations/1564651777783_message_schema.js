'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.increments()
      table
        .integer('chat_user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('chat_users')
      table.text('content').notNullable()
      table.datetime('date_msg').defaultTo(this.fn.now())
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessageSchema
