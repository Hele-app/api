'use strict'

import { db } from '../../config'

export default class EstablishmentDAO {
  static addCondition(query, params) {
    if (params) {
      query = query.where(function () {
        this
          .where('establishments.code', params)
          .orWhere('establishments.name', 'like', `%${params}%`)
      })
    }
    return query
  }

  static async all() {
    const establishments = await db.from('establishments').select('*')
      .leftJoin('regions', 'establishments.region_id', 'regions.id')
    return establishments
  }

  static async count(params) {
    let query = db('establishments')
    query = EstablishmentDAO.addCondition(query, params)
    const count = (await query.count('establishments.id as count'))[0].count
    return count
  }

  static async index(params, offset, limit) {
    let query = db('establishments')
    query = EstablishmentDAO.addCondition(query, params)
    const establishments = await query.select('*')
      .leftJoin('regions', 'establishments.region_id', 'regions.id')
      .offset(offset).limit(limit)
    return establishments
  }
}
