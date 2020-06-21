'use strict'

import { exists } from '../customRules'

export const schema = {
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
