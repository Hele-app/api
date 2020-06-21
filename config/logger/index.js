'use strict'

import { createLogger, format, transports, config } from 'winston'
const { combine, timestamp } = format

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  levels: config.syslog.levels,
  format: combine(timestamp(),
    process.env.NODE_ENV === 'production' ? format.json()
      : format.prettyPrint()),
  transports: [new transports.Console()]
})

export default logger
