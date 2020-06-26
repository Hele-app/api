'use strict'

import moment from 'moment'

export const generatedAgo = (createdAt, unit = 'minutes') => {
  return moment().diff(createdAt, unit)
}
