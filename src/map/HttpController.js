'use strict'

import { getPagination } from '../commons/helpers'
import PoiDAO from './DAO'

export default class MapController {
  static async index(req, res) {
    const { offset, limit } = getPagination(req.query)
    const total = PoiDAO.count(req.query.query)
    const totalPages = Math.ceil(total / limit)
    const results = await PoiDAO.index(req.query.query, offset, limit)
    return res.status(200).json({ results, total, totalPages })
  }

  static async getRegion(req, res) {
    const { region } = req.params
    const results = await PoiDAO.getRegion(region)
    return res.status(200).json({ results })
  }

  static async store(req, res) {
    const poi = await PoiDAO.store(req.body)
    return res.status(201).json({ poi })
  }

  static async update(req, res) {
    const poi = await PoiDAO.update(req.params.id, req.body)
    return res.status(200).json({ poi })
  }

  static async destroy(req, res) {
    await PoiDAO.delete(req.params.id)
    return res.status(204).send()
  }
}
