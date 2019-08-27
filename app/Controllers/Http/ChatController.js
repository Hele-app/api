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
   * Get all chats the logged user can access and every other users in them.
   * 
   * @apiSuccess (Success 200) {Object} usersChats An object that contain all chats the user can access and all the users they contain.
   * @apiSuccess (Success 200) {Number} usersChats.id Chat unique ID.
   * @apiSuccess (Success 200) {String} usersChats.type Define if the chat is a group chat or a private chat.
   * @apiSuccess (Success 200) {Object[]} usersChats.users List of all users in this chat.
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
   * @apiSuccess (Success 200) {Number} messages.total Total number of page of pagination.
   * @apiSuccess (Success 200) {Number} messages.perPage Number of messages per page of pagination.
   * @apiSuccess (Success 200) {Number} messages.page Number of the current page of pagination.
   * @apiSuccess (Success 200) {Number} messages.lastPage Number of the last page of pagination.
   * @apiSuccess (Success 200) {Object[]} messages.data Array of objects that contain each chat with their messages and author.
   */

  async show({ params: { id, page }, response }) {

    const chat =  await Chat.findOrFail(id);
    await chat.load('users', 
      builder => { builder.distinct('users.id').select('username', 'roles')
    })

    let messages = await chat
      .messages()
      .with('user')
      .orderBy('created_at', 'DESC')
      .paginate(page || 1, 10)

    messages = messages.toJSON()

    messages.data = messages.data.map((m) => {
      m.user = {
        id: m.user[0].id,
        username: m.user[0].username,
        roles: m.user[0].roles
      }
      return m;
    });

    if (messages.length !== 0) {
      response.status(200).json(messages)
    } else {
      response.status(404).send('Not found')
    }  
  }
}


module.exports = ChatController
