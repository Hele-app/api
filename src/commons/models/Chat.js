'use strict'

import { orm } from '../../../config'
import User from './User'
import Message from './Message'

const Chat = orm.model('Chat', {
  hasTimestamps: true,
  tableName: 'chats',
  users() {
    return this.belongsToMany(User)
  },
  messages() {
    return this.hasMany(Message)
  }
})

export default Chat
