'use strict'

const Post = use('App/Models/Post')
const Database = use('Database')

class PostController {
  constructor({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log('socket id message', socket.id)
  }

  async onMessage(message) {
    try {
      if (msg.length === 0 || /^\s*$/.test(msg)) { return }
      await message.save()
      //retour du message afin de l'afficher
      this.socket.broadcastToAll('send', message)
      console.log('you receive a message socket from client', message)
    }
    
  }
}

module.exports = PostController
