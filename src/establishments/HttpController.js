'use strict'

import { Establishment } from '../commons/models'
import { generateEstablishmentCode } from '../commons/helpers'

export default class EstablishmentController {
  static async all(req, res) {
    const establishments = await Establishment.fetchAll({ withRelated: ['region'] })
    return res.status(200).json({ data: establishments })
  }

  static async index(req, res) {
    const establishments = await Establishment.query(qb => {
      if (req.query.q) {
        qb.where('code', req.query.q).orWhere('name', 'like', `%${req.query.q}%`)
      }
    }).fetchPage({
      page: req.query.p || 1,
      withRelated: ['region']
    })

    return res.status(200).json({ data: establishments.models, ...establishments.pagination })
  }

  static async store(req, res) {
    let code
    do {
      code = generateEstablishmentCode()
    } while (await Establishment.where({ code }).count() > 0)

    const establishment = await Establishment.forge({
      name: req.body.name,
      region_id: req.body.region_id,
      code
    }).save()

    return res.status(201).json(establishment)
  }

  static async show(req, res) {
    const establishment = await new Establishment({ id: req.params.id }).fetch({ withRelated: ['region'] })

    return res.status(200).json(establishment)
  }

  static async update(req, res) {
    const establishment = await new Establishment({ id: req.params.id }).save({ name: req.body.name, region_id: req.body.region_id })

    return res.status(200).json(establishment)
  }

  static async destroy(req, res) {
    await Establishment.where({ id: req.params.id }).destroy()

    return res.status(204).send()
  }
}
