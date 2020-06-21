'use strict'

import { unique, exists } from '../customRules'

export const schema = {
  phone: {
    exists: {
      errorMessage: 'E_PHONE_REQUIRED'
    },
    bail: true,
    matches: {
      options: '^0[6-7](\\d{2}){4}$',
      errorMessage: 'E_PHONE_WRONG_FORMAT'
    },
    custom: {
      options: async (value, { req }) => {
        if (!await unique('users', 'phone', req.body.phone)) {
          throw new Error('E_PHONE_NOT_UNIQUE')
        }
      }
    }
  },
  username: {
    exists: {
      errorMessage: 'E_USERNAME_REQUIRED'
    },
    bail: true,
    matches: {
      options: '^[a-z][a-z0-9]{3,}$',
      errorMessage: 'E_USERNAME_WRONG_FORMAT'
    }
  },
  age: {
    exists: {
      errorMessage: 'E_AGE_REQUIRED'
    },
    isInt: {
      options: { min: 13, max: 17 },
      errorMessage: 'E_AGE_VALIDATION'
    }
  },
  establishment_code: {
    exists: {
      errorMessage: 'E_ESTABLISHMENT_CODE_REQUIRED'
    },
    bail: true,
    matches: {
      options: '^[A-Z]{5}$',
      errorMessage: 'E_ESTABLISHMENT_CODE_WRONG_FORMAT'
    },
    custom: {
      options: async (value, { req }) => {
        if (!await exists('establishments', 'code', req.body.establishment_code)) {
          throw new Error('E_ESTABLISHMENT_CODE_NOT_FOUND')
        }
      }
    }
  }
}
