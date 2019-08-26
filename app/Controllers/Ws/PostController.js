'use strict'

const User = use('App/Models/User')
const Post = use('App/Models/Post')
const Database = use('Database')

class PostController {
  constructor({ socket, request, auth }) {
    this.socket = socket
    this.request = request
    this.auth = auth
    console.log('socket id message', socket.id)
  }

  async onMessage(message) {
    try {
      if (message.length === 0 || /^\s*$/.test(message)) { return }
      const user = await this.auth.getUser()
      const postId = await Database
        .table('posts')
        .insert({ id_user: user.id , content: message.message })
    } catch (err) {
      console.error('erreur', err)
    }
    this.socket.broadcastToAll('send', {
      user: user,
      message: message,
      date: ''
    })

    console.log('you receive a message socket from client', message)
  }
}

module.exports = PostController
