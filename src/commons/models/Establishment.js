'use strict'

import { orm } from '../../../config'
import User from './User'
import Region from './Region'

const Establishment = orm.model('Establishment', {
  hasTimestamps: true,
  tableName: 'establishments',
  users() {
    return this.hasMany(User)
  },
  region() {
    return this.belongsTo(Region)
  }
})

export default Establishment
