'use strict'

import argon from 'argon2'
import { User } from '../commons/models'
import { generatePassword, sendSMS } from '../commons/helpers'

export default class ProController {
  static async index(req, res) {
    const users = await User.isPro().where(function () {
      if (req.query.q) {
        this.where('phone', req.query.q)
          .orWhere('username', 'like', `%${req.query.q}%`)
          .orWhere('email', 'like', `%${req.query.q}%`)
          .orWhere('profession', 'like', `%${req.query.q}%`)
          .orWhere('role', req.query.q.toUpperCase())
      }
    }).fetchPage({
      page: req.query.p || 1
    })

    return res.status(200).json({ data: users.models, ...users.pagination })
  }

  static async store(req, res) {
    const password = generatePassword()

    const user = await User.forge({
      phone: req.body.phone,
      username: req.body.username,
      birthyear: req.body.birthyear,
      password: await argon.hash(password),
      email: req.body.email,
      profession: req.body.profession,
      city: req.body.city,
      phone_pro: req.body.phone_pro,
      role: req.body.role || 'PROFESSIONAL'
    }).save()

    if (process.env.NODE_ENV === 'production') {
      // TODO: text should be generated from a package and not from an hardcoded unlocalised string
      sendSMS(`Salut ${user.get('username')} !\nBienvenu sur Hélé. Votre mot de passe pour vous connecter est ${password}.`, user.get('phone'))
      return res.status(201).json({})
    }

    return res.status(201).json({ data: { user, password } })
  }

  static async show(req, res) {
    const user = await new User({ id: req.params.id }).fetch()

    return res.status(200).json({ data: user })
  }

  static async update(req, res) {
    const user = await new User({ id: req.params.id }).fetch()

    await user.save({
      phone: req.body.phone,
      username: req.body.username,
      birthyear: req.body.birthyear,
      email: req.body.email,
      profession: req.body.profession,
      city: req.body.city,
      phone_pro: req.body.phone_pro,
      role: req.body.role || 'PROFESSIONAL'
    })

    return res.status(200).json({ data: user })
  }

  static async destroy(req, res) {
    await User.where({ id: req.params.id }).destroy()

    return res.status(204).send()
  }
}
