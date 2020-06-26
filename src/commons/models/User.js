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
    this.on('saving', function (model, attrs, options) {
      console.log(model, attrs, options)
      // TODO: maybe encode the password here if dirty using argon ?
    })
  },
  establishment() {
    return this.belongsTo(Establishment)
  },
  passwordResets() {
    return this.hasMany(PasswordReset).query({ orderBy: ['created_at', 'DESC'] })
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
