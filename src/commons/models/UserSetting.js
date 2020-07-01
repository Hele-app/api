'use strict'

import { orm } from '../../../config'
import User from './User'

const UserSetting = orm.model('UserSetting', {
  hasTimestamps: true,
  tableName: 'users',
  hidden: ['password', 'passwordResets'],
  user() {
    return this.belongsTo(User)
  }
})

export default UserSetting
