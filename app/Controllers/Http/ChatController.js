'use strict'

const Chat = use('App/Models/Chat')
const Message = use('App/Models/Message')

class ChatController {

  async index({ request, response }) {
    //TODO : get all group the user can access
  }

  // Return all messages and their user & all users for this chat
  async show({ params: { id }, request, response }) {

    const chat = await Chat.find(id)    
    await chat.loadMany(['messages.user', 'users'])

    response.status(200).json(chat)
  }
}


module.exports = ChatController
