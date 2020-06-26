'use strict'

import argon from 'argon2'
import { User, Establishment } from '../commons/models'
import { generatePassword, sendSMS } from '../commons/helpers'

export default class YoungController {
  static async index(req, res) {
    const users = await User.isYoung().where(function () {
      if (req.query.q) {
        this.where('phone', req.query.q)
          .orWhere('username', 'like', `%${req.query.q}%`)
      }
    }).fetchPage({
      page: req.query.p || 1,
      withRelated: ['establishment']
    })

    return res.status(200).json({ data: users.models, ...users.pagination })
  }

  static async store(req, res) {
    const password = generatePassword()

    const establishment = await Establishment.where({
      code: req.body.establishment_code
    }).fetch()

    const user = await User.forge({
      phone: req.body.phone,
      username: req.body.username,
      birthyear: req.body.birthyear,
      password: await argon.hash(password),
      establishment_id: establishment.get('id')
    }).save()

    if (process.env.NODE_ENV === 'production') {
      // TODO: text should be generated from a package and not from an hardcoded unlocalised string
      sendSMS(`Salut ${user.get('username')} !\nBienvenu sur Hélé. Ton mot de passe pour te connecter est ${password}.\nA bientôt sur Hélé !`, user.get('phone'))
      return res.status(201).json({})
    }

    return res.status(201).json({ user, password })
  }

  static async show(req, res) {
    const user = await new User({ id: req.params.id })
      .fetch({ withRelated: ['establishment'] })

    return res.status(200).json(user)
  }

  static async update(req, res) {
    const user = await new User({ id: req.params.id }).fetch({ withRelated: ['establishment'] })
    let establishment = null
    if (req.body.establishment_code) {
      establishment = await new Establishment({
        code: req.body.establishment_code
      }).fetch()
    }
    await user.save({
      username: req.body.username,
      phone: req.body.phone,
      establishment_id: establishment ? establishment.get('id') : user.get('establishment_id'),
      birthyear: req.body.birthyear
    })

    return res.status(200).json(user)
  }

  static async destroy(req, res) {
    await User.where({ id: req.params.id }).destroy()

    return res.status(204).send()
  }
}
