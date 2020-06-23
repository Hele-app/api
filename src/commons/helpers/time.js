'use strict'

import moment from 'moment'

export const generatedAgo = async (createdAt, unit = 'minutes') => {
  return moment().diff(createdAt, unit)
}
