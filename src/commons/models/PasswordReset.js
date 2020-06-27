'use strict'

import { orm } from '../../../config'
import User from './User'

const PasswordReset = orm.model('PasswordReset', {
  hasTimestamps: true,
  tableName: 'password_resets',
  user() {
    return this.belongsTo(User)
  }
})

export default PasswordReset
