'use strict'

const Message = use('App/Models/Message')
const Database = use('Database')

class ChatController {
  constructor ({ socket, request, auth }) {
    this.socket = socket
    this.request = request
    this.auth = auth
  }

  async onMessage(msg) {
    try {
      if (msg.length === 0 || /^\s*$/.test(msg)) { return }

      const user = await this.auth.getUser()
      const username = user.username
      const userID = user.id
      const chatID = this.socket.topic.replace('chat:', '')

      const chatUser = await Database
        .select('id')
        .from('chat_users')
        .where({
          'user_id': userID, 
          'chat_id': chatID
        })
  
      const chatUserID = chatUser[0].id
      
      const message = new Message
      message.chat_user_id = chatUserID
      message.content = msg.trim()

      await message.save()
      
      this.socket.broadcastToAll('message', {
        message: message.content,
        user: username
      })

    } catch (err){
      console.error('msg error', err)
    }
  }

  onError(err) {
    console.error('error', err)
  }
}

module.exports = ChatController
