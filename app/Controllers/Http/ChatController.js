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
      .orderBy('type', 'asc')
      .with('users', builder => { builder.select('username') })
      .fetch()

    usersChats = usersChats.toJSON()

    response.status(200).json(usersChats)

  }

  async show({ params: { id, page }, response }) {

    let messages =  await Chat
      .query()
      .where('id', id)
      .with('messages.user')
      .with('users', builder => { builder.distinct('users.id').select('username', 'roles') })
      .paginate(page || 1)

    messages = messages.toJSON()

    if (messages.length !== 0) {
      response.status(200).json(messages)
    } else {
      response.status(404).send('Not found')
    }  
  }
}


module.exports = ChatController
