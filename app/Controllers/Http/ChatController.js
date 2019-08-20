'use strict'

const Chat = use('App/Models/Chat')


class ChatController {

  /***
   * @api {get} /chat
   * @apiVersion 1.0.0
   * @apiPermission logged
   * @apiName GetChat
   * @apiGroup Chat
   * @apiDescription
   * Get all chats the user logged can access, and get all their users.
   * 
   * @apiSuccess (Success 200) {Object} usersChats An object that contain all chats the user can access and the all the users they contain.
   */

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

  /***
   * @api {get} /chat/:id/:page?
   * @apiVersion 1.0.0
   * @apiPermission logged
   * @apiName GeChatMessage
   * @apiGroup Chat
   * @apiDescription
   * Get all messages from a given chat with their author, and the list of all users in that chat.
   * 
   * @apiParam {Number} id Chat unique ID.
   * @apiParam {Number} [page] Optional page number for messages pagination.
   * 
   * @apiSuccess (Success 200) {Object} messages An object that contains all messages (and their author) from a given chat, and all users connected to that chat.
   */

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
