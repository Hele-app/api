'use strict'

const Database = use('Database')

class PostController {
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
        .table('posts')
        .insert({ user_id: user.id , content: message })
        this.socket.broadcastToAll('send', {
          user: user,
          content: message,
          created_at: ''
        })
    } catch (err) {
      console.error('erreur', err)
    }
  }
}

module.exports = PostController
