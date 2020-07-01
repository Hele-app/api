'use strict'

import { Chat } from '../models'

export const userInChat = async (socket, next) => {
  if (!socket.handshake.query.chatId) {
    next(new Error('E_CHAT_ID_REQUIRED'))
  } else {
    try {
      const chat = await new Chat({ id: socket.handshake.query.chatId })
        .fetch({ withRelated: ['users'] })
      for (const user of chat.related('users')) {
        if (user.id === socket.user.get('id')) {
          socket.chatId = socket.handshake.query.chatId
          return next()
        }
      }
      next(new Error('E_CHAT_NOT_AUTHORIZED'))
    } catch (e) {
      return next(new Error('E_CHAT_NOT_FOUND'))
    }
  }
}
