'use strict'

import jwt from 'jsonwebtoken'
import { roles } from '../../../config'
import { User } from '../models'

const checkAuthToken = async headers => {
  if (!headers.authorization) return false

  const authorization = headers.authorization.split(' ')
  if (authorization[0] !== 'Bearer') return false

  try {
    const decoded = jwt.verify(authorization[1], process.env.APP_KEY)
    const user = await new User({ id: decoded.user }).fetch()

    if (!user) return false
    if (!user.get('active')) return false

    return user
  } catch (e) {
    return false
  }
}

export const loggedIn = async (req, res, next) => {
  const user = await checkAuthToken(req.headers)
  if (user) {
    req.user = user
    next()
  } else {
    res.status(401).end()
  }
}

export const wsLoggedIn = async (socket, next) => {
  const req = socket.handshake.headers
  const user = await checkAuthToken(req)
  if (user) {
    socket.user = user
    next()
  } else {
    next(new Error('E_NOT_AUTHORIZED'))
  }
}

export const IsRole = function (role) {
  this.role = role
  return async (req, res, next) => {
    if (!req.user || !req.user.get('role') ||
      roles[req.user.get('role')] < roles[this.role]) {
      return res.status(401).end()
    }
    return next()
  }
}
