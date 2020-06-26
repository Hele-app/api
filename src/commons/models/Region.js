'use strict'

import { orm } from '../../../config'
import Establishment from './Establishment'
import User from './User'

const Region = orm.model('Region', {
  hasTimestamps: true,
  tableName: 'regions',
  establishments() {
    return this.hasMany(Establishment)
  },
  users() {
    return this.hasMany(User).through(Establishment)
  }
})

export default Region
