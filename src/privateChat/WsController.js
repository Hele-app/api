'use strict'

import { Message } from '../commons/models'

export default class ChatController {
  static async onMessage(socket, message) {
    await Message.forge({
      chat_id: socket.chatId,
      user_id: socket.user.get('id'),
      body: message
    }).save()
    socket.broadcast.to(`chat#${socket.chatId}`).emit('message', message)
  }

  static async onDisconnect(socket) {
  }
}
