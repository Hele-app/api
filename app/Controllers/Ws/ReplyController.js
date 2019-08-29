'use strict'
const Database = use('Database')

class ReplyController {
  constructor({ socket, request, auth }) {
    this.socket = socket
    this.request = request
    this.auth = auth
  }

  async onMessage(message) {
    try {
      if (message.length === 0 || /^\s*$/.test(message)) { return }
      const user = await this.auth.getUser()
      const postId = await Database
        .table('replies')
        .insert({ user_id: user.id , post_id: message.id, content: message.message })
        this.socket.broadcastToAll('send', {
          user: user,
          content: message.message,
          created_at: ''
        })
        console.log(message)
    } catch (err) {
      console.error('erreur', err)
    }
  }
}

module.exports = ReplyController
