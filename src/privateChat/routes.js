'use strict'

import { Router } from 'express'
import { io } from '../../config'
import HttpController from './HttpController'
import WsController from './WsController'
import { loggedIn, wsLoggedIn, userInChat } from '../commons/middlewares'

const router = Router()

router.use(loggedIn)
router.get('/:id', HttpController.lastMessages)

const privateChat = io.of('/private-chat')
privateChat.use(wsLoggedIn)
privateChat.use(userInChat)

privateChat.on('connection', async socket => {
  await socket.join(`chat#${socket.chatId}`)

  socket.on('message', async message => await WsController.onMessage(socket, message))
  socket.on('disconnect', () => WsController.onDisconnect(socket))
  console.log('Connected')
})

export default router
