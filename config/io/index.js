'use strict'

import io from 'socket.io'
import redis from 'socket.io-redis'

const options = {}
const server = io(options)
server.adapter(redis({ host: 'localhost', port: 6379 }))

export default server
