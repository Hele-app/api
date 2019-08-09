'use strict'

const Chat = use('App/Models/Chat')

class ChatController {

  async index({ response, auth }) {

    const user = await auth.getUser()
    const chats = await user.chats().fetch()

    if (chats.length !== 0) {
      response.status(200).json(chats.toJSON())
    } else {
      response.status(404).send('Not found')
    }
  }

  async show({ params: { id }, response }) {

    const chat = await Chat.findOrFail(id)
    
    await chat.loadMany({
      'messages.user': null, 
      'users': builder => { builder.distinct('users.id').select('username', 'roles') }
    })

    if (chat.length !== 0) {
      response.status(200).json(chat.toJSON())
    } else {
      response.status(404).send('Not found')
    }  
  }
}


module.exports = ChatController
