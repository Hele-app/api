'use strict'

import { getPagination } from '../commons/helpers'
import EstablishmentDAO from './DAO'

export default class EstablishmentController {
  static async all(req, res) {
    return res.status(200).json({ results: await EstablishmentDAO.all() })
  }

  static async index(req, res) {
    const { offset, limit } = getPagination(req.query)
    const total = EstablishmentDAO.count(req.query.query)
    const totalPages = Math.ceil(total / limit)
    const results = await EstablishmentDAO.index(req.query.query, offset, limit)
    return res.status(200).json({ results, total, totalPages })
  }
  /*
    static async store({ request, response }) {
      let code = generateEstablishmentCode()

      while (Establishment.findBy('code', code) === null) {
        code = generateEstablishmentCode()
      }

      const data = request.only(['name', 'region_id'])
      data.code = code

      const establishment = await Establishment.create(data)

      return response.status(201).json(establishment)
    }

    static async show({ params, request, response }) {
      const establishment = await Establishment.findOrFail(params.id)
      await establishment.load('region')

      return response.status(200).json(establishment)
    }

    static asyn update({ params, request, response }) {
      const newData = request.only(['name', 'region_id'])

      const establishment = await Establishment.findOrFail(params.id)
      establishment.merge(newData)
      await establishment.save()

      return response.status(200).json(establishment)
    }

    static asyn destroy({ params, request, response }) {
      const establishment = await Establishment.findOrFail(params.id)
      await establishment.delete()

      return response.status(204).send()
    }
    */
}
