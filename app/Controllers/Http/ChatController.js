'use strict'

const Chat = use('App/Models/Chat')


class ChatController {

  async index({ response, auth }) {

    const user = await auth.getUser()
    
    let chats = await user.chats().fetch()
    chats = chats.toJSON()

  
    if (chats.length === 0) { return response.status(404).send('Not found') }

    const chatsID = chats.map(chat => {
      return chat.id
    })

    let usersChats = await Chat
      .query()
      .whereIn('id', chatsID)
      .with('users', builder => { builder.select('username') })
      .fetch()

    usersChats = usersChats.toJSON()

    response.status(200).json(usersChats)

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
