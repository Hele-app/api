'use strict'

class PostController {
  constructor({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log('socket id message', socket.id)
  }

  onMessage(message) {
    //retour du message afin de l'afficher
    this.socket.broadcastToAll('send', message)
    console.log('you receive a message socket from client', message)
  }
}

module.exports = PostController
