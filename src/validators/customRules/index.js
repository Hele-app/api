'use strict'

import db from '../../../config/database'

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
