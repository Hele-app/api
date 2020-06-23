'use strict'

import { validationResult } from 'express-validator'
import { db } from '../../../config'

export const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    res.status(422).json({ errors: errors.array() })
  }
}

export const unique = async (table, column, value) => {
  const result = await db(table).where({ [column]: value }).first()
  if (!result) {
    return true
  }
  return false
}

export const exists = async (table, column, value) => {
  const result = await db(table).where({ [column]: value }).first()
  if (result) {
    return true
  }
  return false
}

export const requiredWithoutAll = (body, fields) => {
  for (const field of fields) {
    if (body[field]) return false
  }
  return true
}
