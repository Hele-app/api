'use strict'

class MessageController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  async onMessage(msg) {
    // const chat = await Chat.findOrFail(id)

    // const message = new Message
    // // message.content = request.

    // await chat.messages().save(message)
    
    // return request
  }
}

module.exports = MessageController
