'use strict'

const User = use('App/Models/User')
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
      console.log(auth)
      if (message.length === 0 || /^\s*$/.test(message)) { return }
      const user = await this.auth.getUser()
      console.log(user)
      const postId = await Database
        .table('posts')
        .insert({ id_user: 1 , contenu: 'foofoofoo', created_at: '12/12/21'})
        console.log(postId)
    } catch (err) {
      console.error('erreur', err)
    }
    this.socket.broadcastToAll('send', {
      user: 'dr jacob',
      message: message,
      date:'12/12/21'
    })
    console.log('you receive a message socket from client', message)
  }
}

module.exports = PostController
