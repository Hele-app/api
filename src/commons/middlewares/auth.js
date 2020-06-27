'use strict'

import jwt from 'jsonwebtoken'
import { roles } from '../../../config'
import { User } from '../models'

export const loggedIn = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).end()

  const authorization = req.headers.authorization.split(' ')
  if (authorization[0] !== 'Bearer') return res.status(401).end()

  try {
    const decoded = jwt.verify(authorization[1], process.env.APP_KEY)
    const user = await new User({ id: decoded.user }).fetch()

    if (!user) return res.status(401).end()
    if (!user.get('active')) return res.status(401).end()

    req.user = user
    return next()
  } catch (e) {
    return res.status(401).end()
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
