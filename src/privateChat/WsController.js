'use strict'

import { io } from '../../config'
import { Message } from '../commons/models'

export default class ChatController {
  static async onMessage(socket, message) {
    message = await Message.forge({
      chat_id: socket.chatId,
      user_id: socket.user.get('id'),
      body: message
    }).save()
    await message.load(['user'])
    io.of(socket.nsp.name).to(`chat#${socket.chatId}`).emit('message', message)
  }

  static async onDisconnect(socket) {
  }
}
