'use strict'

import { db } from '../../config'

export default class PoiDAO {
  static addCondition(query, params) {
    if (params) {
      query = query.where(function () {
        this
          .where('map_pois.code', params)
          .orWhere('map_pois.name', 'like', `%${params}%`)
      })
    }
    return query
  }

  static async all() {
    const mapPois = await db.from('map_pois').select('*')
      .leftJoin('regions', 'map_pois.region_id', 'regions.id')
    return mapPois
  }

  static async count(params) {
    let query = db('map_pois')
    query = PoiDAO.addCondition(query, params)
    const count = (await query.count('map_pois.id as count'))[0].count
    return count
  }

  static async index(params, offset, limit) {
    let query = db('map_pois')
    query = PoiDAO.addCondition(query, params)
    const mapPois = await query.select('*')
      .leftJoin('regions', 'map_pois.region_id', 'regions.id')
      .offset(offset).limit(limit)
    return mapPois
  }

  static async getRegion(regionId) {
    return await db('map_pois').where('region_id', regionId).select('*')
  }

  static async create(data) {
    const mapPoiId = await db('map_pois').insert(data)
    return await db('map_pois').where('id', mapPoiId).first()
  }

  static async update(regionId, data) {
    await db('map_pois').where('id', regionId).update(data)
    return await db('map_pois').where('id', regionId).first()
  }

  static async delete(regionId) {
     return await db('map_pois').where('id', regionId).delete()
  }
}
