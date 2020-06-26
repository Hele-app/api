'use strict'

import { exists } from '../../commons/helpers'

export default {
  name: {
    exists: {
      errorMessage: 'E_NAME_REQUIRED'
    }
  },
  region_id: {
    exists: {
      errorMessage: 'E_REGION_ID_REQUIRED'
    },
    bail: true,
    custom: {
      options: async (value, { req }) => {
        if (!await exists('regions', 'id', req.body.region_id)) {
          throw new Error('E_REGION_ID_NOT_FOUND')
        }
      }
    }
  }
}
