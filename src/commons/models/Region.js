'use strict'

import { orm } from '../../../config'
import Establishment from './Establishment'
import User from './User'
import MapPOI from './MapPOI'

const Region = orm.model('Region', {
  hasTimestamps: true,
  tableName: 'regions',
  establishments() {
    return this.hasMany(Establishment)
  },
  users() {
    return this.hasMany(User).through(Establishment)
  },
  pois() {
    return this.hasMany(MapPOI)
  }
})

export default Region
