'use strict'

import { uniqueOrSame } from '../../commons/helpers/validators'
import roles from '../../../config/roles'

export default {
  phone: {
    exists: {
      errorMessage: 'E_PHONE_REQUIRED'
    },
    bail: true,
    isMobilePhone: {
      options: 'fr-FR',
      errorMessage: 'E_PHONE_WRONG_FORMAT'
    },
    custom: {
      options: async (value, { req }) => {
        if (!await uniqueOrSame('users', 'phone', req.body.phone, req.params.id)) {
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
      options: '^[a-z][a-z0-9]{3,20}$',
      errorMessage: 'E_USERNAME_WRONG_FORMAT'
    }
  },
  birthyear: {
    exists: {
      errorMessage: 'E_BIRTHYEAR_REQUIRED'
    },
    isInt: {
      errorMessage: 'E_BIRTHYEAR_WRONG_FORMAT'
    }
  },
  email: {
    exists: {
      errorMessage: 'E_EMAIL_REQUIRED'
    }
  },
  profession: {
    exists: {
      errorMessage: 'E_PROFESSION_REQUIRED'
    }
  },
  city: {
    exists: {
      errorMessage: 'E_CITY_REQUIRED'
    }
  },
  phone_pro: {
    exists: {
      errorMessage: 'E_PHONE_PRO_REQUIRED'
    }
  },
  role: {
    optional: { options: { nullable: true } },
    custom: {
      options: async (value) => {
        if (!Object.keys(roles).includes(value)) {
          throw new Error('E_PHONE_NOT_UNIQUE')
        }
      }
    }
  }
}
