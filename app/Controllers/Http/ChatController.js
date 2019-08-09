'use strict'

const Chat = use('App/Models/Chat')
const Message = use('App/Models/Message')

class ChatController {

  async index({ request, response }) {
    //TODO : get all group the user can access
  }

  // Return all messages and their user & all users for this chat
  async show({ params: { id }, response }) {

    const chat = await Chat.findOrFail(id)

    await chat.loadMany({
      'messages.user': null,
      'users': builder => { builder.distinct('users.id').select('username', 'roles') }
    })

    response.status(200).json(chat.toJSON())
  }
}


module.exports = ChatController
