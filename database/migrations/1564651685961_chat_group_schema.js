'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChatGroupSchema extends Schema {
  up () {
    this.create('chat_groups', (table) => {
      table.increments()
      table.enu('type', ['PRIVATE', 'GROUP'])
    })
  }

  down () {
    this.drop('chat_groups')
  }
}

module.exports = ChatGroupSchema
