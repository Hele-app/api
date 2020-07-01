'use strict'

import { orm } from '../../../config'
import Establishment from './Establishment'
import PasswordReset from './PasswordReset'
import UserSetting from './UserSetting'
import Chat from './Chat'
import Message from './Message'

const User = orm.model('User', {
  hasTimestamps: true,
  tableName: 'users',
  hidden: ['password', 'passwordResets'],
  establishment() {
    return this.belongsTo(Establishment)
  },
  passwordResets() {
    return this.hasMany(PasswordReset).query({ orderBy: ['created_at', 'DESC'] })
  },
  settings() {
    return this.hasOne(UserSetting)
  },
  chats() {
    return this.belongsToMany(Chat)
  },
  privateChat() {
    return this.belongsToMany(Chat).query({
      where: {
        type: 'PRIVATE',
        active: true
      }
    })
  },
  groupChat() {
    return this.belongsToMany(Chat).query({
      where: {
        type: 'GROUP',
        active: true
      }
    })
  },
  messages() {
    return this.hasMany(Message)
  }
}, {
  isYoung() {
    return new this().where('role', 'YOUNG')
  },
  isPro() {
    return new this().where('role', '<>', 'YOUNG')
  }
})

export default User
