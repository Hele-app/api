'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatGroupSchema extends Schema {
  up () {
    this.create('chats', (table) => {
      table.increments()
      table.enu('type', ['PRIVATE', 'GROUP'])
    })
  }

  down () {
    this.drop('chats')
  }
}

module.exports = ChatGroupSchema
