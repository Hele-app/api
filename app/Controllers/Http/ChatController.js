'use strict'

const Chat = use('App/Models/Chat')

class ChatController {

  async index({ response, auth }) {

    const user = await auth.getUser()
    const chats = await user.chats().fetch()

    response.status(200).json(chats.toJSON())
  }

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
