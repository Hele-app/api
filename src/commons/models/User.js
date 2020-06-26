'use strict'

import { orm } from '../../../config'
import Establishment from './Establishment'
import PasswordReset from './PasswordReset'

const User = orm.model('User', {
  hasTimestamps: true,
  tableName: 'users',
  hidden: ['password', 'passwordResets'],
  constructor() {
    orm.Model.apply(this, arguments)
    this.on('saving', function(model, attrs, options) {
      console.log(model, attrs, options)
    })
  },
  establishment() {
    return this.belongsTo(Establishment)
  },
  passwordResets() {
    return this.hasMany(PasswordReset).query({ orderBy: ['created_at', 'DESC'] })
  }
})

export default User
