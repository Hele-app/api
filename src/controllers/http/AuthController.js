'use strict'

import argon from 'argon2'
import db from '../../../config/database'
import { generatePassword } from '../../helpers/random'
import { sendSMS } from '../../helpers/auth'

export default class AuthController {
  static async register(req, res) {
    const body = req.body
    const establishment = await db('establishments')
      .where({ code: body.establishment_code }).first()

    if (!establishment) {
      return res.status(404).json({ error: 'E_ESTABLISHMENT_NOT_FOUND' })
    }

    try {
      const password = generatePassword()
      const userId = await db('users').insert({
        phone: body.phone,
        username: body.username,
        establishment_id: establishment.id,
        birthyear: new Date().getFullYear() - body.age,
        password: await argon.hash(password)
      })
      const user = await db('users').select(['username', 'phone'])
        .where({ id: userId }).first()

      if (process.env.NODE_ENV === 'production') {
        // TODO: text should be generated from a package and not from an hardcoded unlocalised string
        sendSMS(`Salut ${user.username} !\nBienvenu sur Hélé. Ton mot de passe pour te connecter est ${password}.\nA bientôt sur Hélé !`, user.phone)
        return res.status(201).json({})
      }

      return res.status(201).json({ user, password })
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'user already exists' })
      } else {
        console.error(e)
        return res.status(500).end()
      }
    }
  }
}
