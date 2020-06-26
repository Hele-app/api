'use strict'

import jwt from 'jsonwebtoken'
import { db, roles } from '../../../config'

export const loggedIn = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).end()

  const authorization = req.headers.authorization.split(' ')
  if (authorization[0] !== 'Bearer') return res.status(401).end()

  try {
    const decoded = jwt.verify(authorization[1], process.env.APP_KEY)
    const user = await db('users').select(['id', 'phone', 'email', 'username', 'active', 'last_login', 'role'])
      .where({ id: decoded.user }).first()

    if (!user) return res.status(401).end()
    if (!user.active) return res.status(401).end()

    req.user = user
    return next()
  } catch (e) {
    return res.status(401).end()
  }
}

export const IsRole = function (role) {
  this.role = role
  return async (req, res, next) => {
    if (!req.user || !req.user.role ||
      roles[req.user.role] < roles[this.role]) {
      return res.status(401).end()
    }
    return next()
  }
}
