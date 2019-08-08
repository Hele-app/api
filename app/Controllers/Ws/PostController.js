'use strict'

class PostController {
  constructor({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log('socket id message', socket.id)
  }

  //recuperation du message sur react native
  onMessage(message) {
    //transmition a la base de donnée MySQL
    const Post = use('App/Models/Post')
    const post = new Post()
    post.content = message
    await post.save()
    //retour du message afin de l'afficher
    this.socket.broadcastToAll('send', message)
    console.log('you receive a message socket from client', message)
  }
}

module.exports = PostController
