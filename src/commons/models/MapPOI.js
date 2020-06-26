'use strict'

import { orm } from '../../../config'
import Region from './Region'

const MapPOI = orm.model('MapPOI', {
  hasTimestamps: true,
  tableName: 'map_pois',
  region() {
    return this.belongsTo(Region)
  }
})

export default MapPOI
