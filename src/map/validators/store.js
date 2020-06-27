'use strict'

import { exists } from '../../commons/helpers'

export default {
  name: {
    exists: {
      errorMessage: 'E_NAME_REQUIRED'
    }
  },
  description: {

  },
  address: {
    exists: {
      errorMessage: 'E_ADDRESS_REQUIRED'
    }
  },
  zipcode: {
    exists: {
      errorMessage: 'E_ZIPCODE_REQUIRED'
    }
  },
  city: {
    exists: {
      errorMessage: 'E_CITY_REQUIRED'
    }
  },
  hour: {
    custom: {
      options: async (value) => {
        // TODO: check if value is correctly formatted HH:MM - HH:MM
      }
    }
  },
  phone: {
    exists: {
      errorMessage: 'E_PHONE_REQUIRED'
    }
  },
  site: {
    custom: {
      options: async (value) => {
        if (value && !String(value).startsWith('http')) {
          throw new Error('E_SITE_FORMAT')
        }
      }
    }
  },
  latitude: {
    exists: {
      errorMessage: 'E_LATITUDE_REQUIRED'
    }
  },
  longitude: {
    exists: {
      errorMessage: 'E_LONGITUDE_REQUIRED'
    }
  },
  region_id: {
    exists: {
      errorMessage: 'E_REGION_ID_REQUIRED'
    },
    bail: true,
    custom: {
      options: async (value) => {
        if (!await exists('regions', 'id', value)) {
          throw new Error('E_REGION_ID_NOT_FOUND')
        }
      }
    }
  }
}
