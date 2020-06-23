'use strict'

import { exists } from '../../commons/helpers'

export default {
  phone: {
    exists: {
      errorMessage: 'E_PHONE_REQUIRED'
    },
    bail: true,
    custom: {
      options: async (value, { req }) => {
        if (!await exists('users', 'phone', req.body.phone)) {
          throw new Error('E_PHONE_NOT_FOUND')
        }
      }
    }
  }
}
