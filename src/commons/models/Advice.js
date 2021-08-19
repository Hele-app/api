'use strict'

import { orm } from '../../../config'

const Advice = orm.model('Advice', {
  hasTimestamps: true,
  tableName: 'advices'
})

export default Advice
