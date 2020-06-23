'use strict'

import { exists, requiredWithoutAll } from '../../commons/helpers/validators'

export default {
  phone: {
    custom: {
      options: async (value, { req }) => {
        if (requiredWithoutAll(req.body, ['username', 'email']) && !value) {
          throw new Error('E_USER_IDENTIFIER_REQUIRED')
        }
        if (value && !await exists('users', 'phone', req.body.phone)) {
          throw new Error('E_USER_IDENTIFIER_OR_PASSWORD_INCORRECT')
        }
      }
    }
  },
  username: {
    custom: {
      options: async (value, { req }) => {
        if (requiredWithoutAll(req.body, ['phone', 'email']) && !value) {
          throw new Error('E_USER_IDENTIFIER_REQUIRED')
        }
        if (value && !await exists('users', 'username', req.body.username)) {
          throw new Error('E_USER_IDENTIFIER_OR_PASSWORD_INCORRECT')
        }
      }
    }
  },
  email: {
    custom: {
      options: async (value, { req }) => {
        if (requiredWithoutAll(req.body, ['username', 'phone']) && !value) {
          throw new Error('E_USER_IDENTIFIER_REQUIRED')
        }
        if (value && !await exists('users', 'email', req.body.email)) {
          throw new Error('E_USER_IDENTIFIER_OR_PASSWORD_INCORRECT')
        }
      }
    }
  },
  password: {
    exists: {
      errorMessage: 'E_PASSWORD_REQUIRED'
    }
  }
}
