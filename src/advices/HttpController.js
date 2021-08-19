'use strict'

import { Advice } from '../commons/models'

export default class AdviceController {
  static async all(req, res) {
    const advices = await Advice.fetchAll()
    return res.status(200).json({ data: advices })
  }

  static async index(req, res) {
    const advices = await Advice.query(qb => {
      if (req.query.q) {
        qb.where('quote', 'like', `%${req.query.q}%`)
      }
    }).fetchPage({
      page: req.query.p || 1
    })

    return res.status(200).json({ data: advices.models, ...advices.pagination })
  }

  static async store(req, res) {
    const advice = await Advice.forge({
      quote: req.body.quote
    }).save()

    return res.status(201).json({ data: advice })
  }

  static async show(req, res) {
    const advice = await new Advice({ id: req.params.id }).fetch()

    return res.status(200).json({ data: advice })
  }

  static async update(req, res) {
    const advice = await new Advice({ id: req.params.id }).save({ quote: req.body.quote })

    return res.status(200).json({ data: advice })
  }

  static async destroy(req, res) {
    await Advice.where({ id: req.params.id }).destroy()

    return res.status(204).send()
  }

  static async random(req, res) {
    const advice = await Advice.query(function(qb) {
      qb.limit(1)
      qb.orderByRaw('RAND()')
    }).fetchAll()

    const data = advice.toJSON()

    if (!data || !data[0]) {
      return res.status(404).json({
        errors:
          [
            {
              msg: 'E_ADVICE_NOT_FOUND'
            }
          ]
      })
    }

    return res.status(200).json({ data: data[0] })
  }
}
