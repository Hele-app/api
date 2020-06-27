'use strict'

import { MapPOI, Region } from '../commons/models'

export default class MapController {
  static async getRegion(req, res) {
    const region = await new Region({ id: req.params.id }).fetch({ withRelated: ['pois'] })
    const pois = await region.related('pois')
    return res.status(200).json({ data: pois })
  }

  static async index(req, res) {
    const pois = await MapPOI.query(qb => {
      if (req.query.q) {
        qb.where('name', 'like', `%${req.query.q}%`)
      }
    }).fetchPage({
      page: req.query.p || 1,
      withRelated: ['region']
    })

    return res.status(200).json({ data: pois.models, ...pois.pagination })
  }

  static async store(req, res) {
    const poi = await MapPOI.forge(req.body).save()

    return res.status(201).json({ data: poi })
  }

  static async show(req, res) {
    const poi = await new MapPOI({ id: req.params.id }).fetch({ withRelated: ['region'] })

    return res.status(200).json({ data: poi })
  }

  static async update(req, res) {
    const poi = await new MapPOI({ id: req.params.id }).save(req.body)

    return res.status(200).json({ data: poi })
  }

  static async destroy(req, res) {
    await MapPOI.where({ id: req.params.id }).destroy()

    return res.status(204).send()
  }
}
