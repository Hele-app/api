'use strict'

class ReplyController {
  constructor({ socket, request, auth, post }) {
    this.socket = socket
    this.request = request
    this.auth = auth
    this.post = post
    console.log('socket id message', socket.id)
  }

  async onMessage(message) {
    try {
      console.log(auth)
      if (message.length === 0 || /^\s*$/.test(message)) { return }
      const user = await this.auth.getUser()
      console.log(user)
      const postId = await Database
        .table('replies')
        .insert({ user_id: user.id , post_id: 1, content: message.message })
        console.log(postId)
    } catch (err) {
      console.error('erreur', err)
    }
    this.socket.broadcastToAll('send', {
      user: 'user',
      message: message,
      date:''
    })
    console.log('you receive a message socket from client', message)
  }
}

module.exports = ReplyController
