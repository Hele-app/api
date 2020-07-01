'use strict'

import { orm } from '../../../config'
import User from './User'
import Chat from './Chat'

const Message = orm.model('Message', {
  hasTimestamps: true,
  tableName: 'messages',
  user() {
    return this.belongsTo(User)
  },
  chat() {
    return this.belongsTo(Chat)
  }
})

export default Message
